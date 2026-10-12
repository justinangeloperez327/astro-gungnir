import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve, posix } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { overrides, presentGuide } from './public-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const checkout = resolve(process.argv[2] ?? '../gungnir');
const repository = 'justinangeloperez327/gungnir';
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();
if (execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: checkout, encoding: 'utf8' }).trim()) {
  throw new Error('Sync from a clean Gungnir checkout so source links identify the imported content.');
}
const readme = await readFile(resolve(checkout, 'README.md'), 'utf8');
const version = readme.match(/Stable (\d+\.\d+\.\d+)/)?.[1];
if (!version) throw new Error('Review the framework release status before syncing.');

// Only application documentation belongs on the website. Slug overrides keep useful public URLs.
const groups = [
  ['Getting Started', ['getting-started', 'sdk-packages', 'release-v1:installation', 'cli-codegen:cli', 'editor-tooling', 'configuration']],
  ['Language', ['language', 'language-types', 'functions:functions-async', 'async', 'expressions', 'statements', 'modules', 'errors']],
  ['HTTP', ['routing', 'controller:controllers', 'middleware', 'request:requests-responses', 'response:responses', 'validation', 'view:views']],
  ['Database & ORM', ['database', 'model:models', 'orm', 'relationships', 'collection:collections', 'migration:migrations', 'postgresql', 'mysql', 'sqlserver', 'mongodb']],
  ['Security', ['authentication:auth', 'policy:policies', 'session:sessions', 'security', 'security-hardening']],
  ['Application Services', ['dependency-injection:container', 'event:events', 'listener:listeners', 'queues', 'scheduler', 'notification:notifications', 'mail', 'cache', 'cache-coordination', 'storage', 'logging-observability', 'external-observability']],
  ['Testing & Deployment', ['testing', 'production', 'production-deployment', 'production-resilience', 'application-performance:performance', 'upgrading']],
];
const entries = groups.flatMap(([group, files], groupIndex) => files.map((item, index) => {
  const [name, slug = name] = item.split(':');
  return { path: `docs/${name}.md`, slug, group, groupOrder: groupIndex + 1, order: index + 2 };
}));
entries.unshift({ path: 'README.md', slug: '', group: 'Getting Started', groupOrder: 1, order: 1 });
const routes = new Map(entries.map(entry => [entry.path, entry.slug ? `/docs/${entry.slug}/` : '/docs/']));
routes.set('docs/README.md', '/docs/');

function rewriteLinks(body, source) {
  return body.replace(/(!?\[[^\]]*\]\()([^\s)]+)(\))/g, (all, start, target, end) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(target)) return all;
    const [file, fragment] = target.split('#');
    const path = posix.normalize(posix.join(posix.dirname(source), file));
    const anchor = path === 'docs/request.md' && fragment === 'uploads' ? 'uploaded-files' : fragment;
    const url = routes.get(path) ?? `https://github.com/${repository}/blob/${commit}/${path}`;
    return `${start}${url}${anchor ? `#${anchor}` : ''}${end}`;
  });
}

// Prepare everything before changing the collection. A missing upstream guide cannot erase it.
const outputs = [];
for (const entry of entries) {
  const source = await readFile(resolve(checkout, entry.path), 'utf8');
  const sourceTitle = source.match(/^# (.+)$/m)?.[1];
  if (!sourceTitle) throw new Error(`Missing title: ${entry.path}`);
  const title = entry.slug === '' ? 'Introduction' : sourceTitle;
  const body = rewriteLinks(presentGuide(entry.path, overrides[entry.path] ?? source.replace(/^# .+\r?\n+/, '')), entry.path);
  const description = entry.slug === ''
    ? 'Build native web applications with models, controllers, routes, views and application services.'
    : `Learn how to use ${sourceTitle.replace(/^The /, '').toLowerCase()} in your Gungnir application.`;
  const file = `src/content/docs/${entry.slug || 'index'}.md`;
  const output = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nslug: ${JSON.stringify(entry.slug)}\ngroup: ${JSON.stringify(entry.group)}\ngroupOrder: ${entry.groupOrder}\norder: ${entry.order}\nsourcePath: ${JSON.stringify(entry.path)}\n---\n\n${body.trim()}\n`;
  outputs.push({ entry, source, file, output });
}
const directory = resolve(root, 'src/content/docs');
await mkdir(directory, { recursive: true });
for (const { file, output } of outputs) await writeFile(resolve(root, file), output);
const expected = new Set(outputs.map(({ file }) => posix.basename(file)));
for (const file of await readdir(directory)) {
  if (file.endsWith('.md') && !expected.has(file)) await rm(resolve(directory, file));
}
const imported = outputs.map(({ entry, source, file, output }) => ({
  path: entry.path, file,
  sourceHash: createHash('sha256').update(source).digest('hex'),
  contentHash: createHash('sha256').update(output).digest('hex'),
}));
await mkdir(resolve(root, 'src/data'), { recursive: true });
await writeFile(resolve(root, 'src/data/gungnir-source.json'), JSON.stringify({ repository, commit, version, imported }, null, 2) + '\n');
console.log(`Synced ${imported.length} application guides from ${repository}@${commit.slice(0, 7)}.`);
