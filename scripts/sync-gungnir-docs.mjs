import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, posix } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const checkout = resolve(process.argv[2] ?? '../gungnir');
const repository = 'justinangeloperez327/gungnir';
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();
if (execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: checkout, encoding: 'utf8' }).trim()) {
  throw new Error('Sync from a clean Gungnir checkout so source links identify the imported content.');
}

// The slug overrides preserve the website's existing public URLs.
const groups = [
  ['Getting Started', ['getting-started', 'development-status:status', 'cli-codegen:cli', 'editor-tooling']],
  ['Language', ['language', 'language-types', 'functions:functions-async', 'async', 'expressions', 'statements', 'modules', 'grammar', 'errors']],
  ['Architecture Concepts', ['application-lifecycle:request-lifecycle', 'dependency-injection:container', 'extensions']],
  ['Framework', ['controller:controllers', 'routing', 'middleware', 'request:requests-responses', 'response:responses', 'validation', 'view:views']],
  ['Security', ['authentication:auth', 'policy:policies', 'security', 'security-hardening']],
  ['Application', ['event:events', 'listener:listeners', 'queues', 'scheduler', 'notification:notifications', 'mail']],
  ['Database & ORM', ['database', 'model:models', 'orm', 'relationships', 'collection:collections', 'migration:migrations', 'postgresql', 'mysql', 'sqlserver', 'mongodb']],
  ['Runtime & Infrastructure', ['session:sessions', 'cache', 'storage', 'async-runtime', 'http-runtime', 'logging-observability']],
  ['Testing & Deployment', ['testing', 'production', 'production-resilience', 'performance']],
  ['Compatibility', ['stability', 'upgrading', 'native-api-abi']],
  ['Compiler Reference', ['ast', 'semantics', 'validated-ast', 'cpp-ir', 'transpiler', 'compiler-correctness', 'compiler-conformance', 'compiler-profiles', 'fuzzing', 'framework-semantics', 'runtime-correctness', 'database-correctness']],
];

const entries = groups.flatMap(([group, files], groupIndex) => files.map((item, index) => {
  const [name, slug = name] = item.split(':');
  const order = groupIndex === 0 ? ({ 'getting-started': 2, status: 3, cli: 6, 'editor-tooling': 7 })[slug] : index + 10;
  return { path: `docs/${name}.md`, slug, group, groupOrder: groupIndex + 1, order };
}));
entries.unshift({ path: 'README.md', slug: '', group: 'Getting Started', groupOrder: 1, order: 1 });
const routes = new Map(entries.map(entry => [entry.path, entry.slug ? `/docs/${entry.slug}/` : '/docs/']));
routes.set('docs/README.md', '/docs/');

function rewriteLinks(body, source) {
  return body.replace(/(!?\[[^\]]*\]\()([^\s)]+)(\))/g, (all, start, target, end) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(target)) return all;
    const [file, fragment] = target.split('#');
    const path = posix.normalize(posix.join(posix.dirname(source), file));
    // The upstream validation guide names this section "uploads"; its actual heading is "Uploaded files".
    const anchor = path === 'docs/request.md' && fragment === 'uploads' ? 'uploaded-files' : fragment;
    const url = routes.get(path) ?? `https://github.com/${repository}/blob/${commit}/${path}`;
    return `${start}${url}${anchor ? `#${anchor}` : ''}${end}`;
  });
}

const imported = [];
await mkdir(resolve(root, 'src/content/docs'), { recursive: true });
for (const entry of entries) {
  const source = await readFile(resolve(checkout, entry.path), 'utf8');
  const sourceTitle = source.match(/^# (.+)$/m)?.[1];
  if (!sourceTitle) throw new Error(`Missing title: ${entry.path}`);
  const title = entry.slug === '' ? 'Introduction' : sourceTitle;
  let body = rewriteLinks(source.replace(/^# .+\r?\n+/, ''), entry.path);
  if (entry.path === 'docs/getting-started.md') {
    const installation = (await readFile(resolve(checkout, 'README.md'), 'utf8')).split('### Build from source\n')[1].split('## Quick start')[0].trim();
    body = body.replace('## Create an application', `## Build from source\n\nCMake 3.25 or newer and a C++23-compatible compiler are required. Run these commands inside a checkout of the Gungnir repository. Source builds represent the current development contract; historical preview packages may differ.\n\n${rewriteLinks(installation, 'README.md')}\n\n## Create an application`);
    body = body.replace('## Validate source', 'The generated environment listens on `http://127.0.0.1:8000`. Change `APP_HOST` and `APP_PORT` in `.env` to choose another address. See [Configuration](/docs/configuration/).\n\n## Validate source');
  }
  const description = entry.slug === ''
    ? 'An expressive C++23 web framework with a structured application language and native runtime.'
    : `${sourceTitle}: current Gungnir APIs, usage, configuration, and documented limits.`;
  const file = `src/content/docs/${entry.slug || 'index'}.md`;
  const output = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nslug: ${JSON.stringify(entry.slug)}\ngroup: ${JSON.stringify(entry.group)}\ngroupOrder: ${entry.groupOrder}\norder: ${entry.order}\nstatus: development\nsourcePath: ${JSON.stringify(entry.path)}\n---\n\n${body.trim()}\n`;
  await writeFile(resolve(root, file), output);
  imported.push({ path: entry.path, file, sourceHash: createHash('sha256').update(source).digest('hex'), contentHash: createHash('sha256').update(output).digest('hex') });
}
await mkdir(resolve(root, 'src/data'), { recursive: true });
await writeFile(resolve(root, 'src/data/gungnir-source.json'), JSON.stringify({ repository, commit, imported }, null, 2) + '\n');
console.log(`Synced ${imported.length} guides from ${repository}@${commit.slice(0, 7)}.`);
