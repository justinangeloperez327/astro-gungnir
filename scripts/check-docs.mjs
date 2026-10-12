import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const source = JSON.parse(await readFile(resolve(root, 'src/data/gungnir-source.json'), 'utf8'));
const errors = [];
if (!/^[a-f0-9]{40}$/.test(source.commit)) errors.push('Invalid framework source commit.');
if (!/^\d+\.\d+\.\d+$/.test(source.version)) errors.push('Invalid framework version.');
const expectedSources = new Set(source.imported.map(entry => entry.file));
const actualSources = (await readdir(resolve(root, 'src/content/docs'))).filter(file => file.endsWith('.md'));
for (const file of actualSources) {
  if (!expectedSources.has(`src/content/docs/${file}`)) errors.push(`Unexpected public guide: ${file}`);
}
for (const entry of source.imported) {
  const content = await readFile(resolve(root, entry.file), 'utf8');
  if (createHash('sha256').update(content).digest('hex') !== entry.contentHash) {
    errors.push(`${entry.file}: imported guide changed; update the source or sync transformation and run docs:sync.`);
  }
  if (/status: development|TypeId|MethodStatement|CppEmitter|Compiler Reference|compiler architecture|docs\/design\//i.test(content)) {
    errors.push(`${entry.file}: contributor material or stale release status in public documentation.`);
  }
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

if (process.argv.includes('--built')) {
  const dist = resolve(root, 'dist');
  const files = await walk(dist);
  const available = new Set(files);
  const pages = new Map();
  const expectedPages = new Set(source.imported.map(entry => {
    const slug = entry.file.split('/').pop().replace(/\.md$/, '');
    return resolve(dist, 'docs', slug === 'index' ? '' : slug, 'index.html');
  }));
  expectedPages.add(resolve(dist, 'index.html'));
  for (const file of files.filter(file => file.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    pages.set(file, { html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])) });
  }
  for (const file of pages.keys()) if (!expectedPages.has(file)) errors.push(`Unexpected built page: ${relative(dist, file)}`);
  for (const file of expectedPages) if (!pages.has(file)) errors.push(`Missing built page: ${relative(dist, file)}`);
  for (const [file, { html }] of pages) {
    for (const [, href] of html.matchAll(/\bhref="([^"]*)"/g)) {
      if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) continue;
      const [path, fragment] = href.split('#');
      const clean = path.split('?')[0];
      let target = clean ? resolve(clean.startsWith('/') ? dist : dirname(file), `.${clean.startsWith('/') ? clean : '/' + clean}`) : file;
      if (!available.has(target)) target = resolve(target, 'index.html');
      if (!available.has(target)) errors.push(`${relative(dist, file)}: missing link ${href}`);
      else if (fragment && pages.has(target) && !pages.get(target).ids.has(decodeURIComponent(fragment))) {
        errors.push(`${relative(dist, file)}: missing anchor ${href}`);
      }
    }
  }
  console.log(`Checked ${pages.size} built pages and their local links and anchors.`);
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else console.log(`Verified ${source.imported.length} imported guides at Gungnir ${source.commit.slice(0, 7)}.`);
