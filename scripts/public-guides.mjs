import { readFile } from 'node:fs/promises';

// Reader-oriented replacements for upstream pages that still describe framework internals.
const curated = ['introduction', 'language-types', 'functions', 'expressions', 'statements', 'modules', 'testing', 'editor-tooling', 'application-performance', 'upgrading'];
export const overrides = Object.fromEntries(await Promise.all(curated.map(async name => [
  name === 'introduction' ? 'README.md' : `docs/${name}.md`,
  await readFile(new URL(`./guides/${name}.md`, import.meta.url), 'utf8'),
])));

export function presentGuide(path, body) {
  // Drop contributor source/test inventories while retaining application bootstrap examples.
  body = body.replace(/^- \[[^\]]*\]\(\.\.\/(?:include|src|tests)\/[^)]+\)\r?\n/gm, '');
  body = body.replace(/\nFor the compiler architecture itself,[^\n]+\n?/g, '\n');
  body = body.replace(/Gungnir lowers asynchronous application code onto its coroutine-based C\+\+ runtime\./, 'Use async actions for supported asynchronous services.');
  body = body.replace(/The Hello controller is compiled\s+by the documentation CI workflow\./, '');
  body = body.replace(/source\/AST storage/g, 'template storage');
  body = body.replace(/\[Application Lifecycle\]\(application-lifecycle.md\)/g, '[Production](production.md)');
  body = body.replace(/,?\s*\[Stability\]\(stability.md\) and/g, ' and');
  body = body.replace(/for deployment and acceptance details/g, 'for shared deployment settings');
  body = body.replace(/for the explicit contract and multi-instance acceptance/g, 'for shared deployment settings and limits');
  body = body.replace(/^> This guide describes the 1\.0 contract and its documented limits\. See \[release scope\]\(release-v1.md\)\.\s*/m, '');
  body = body.replace(/See \[Language\]\(language.md\), \[Functions\]\(functions.md\),\s*\[Async Runtime\]\(async-runtime.md\) and\s*\[Controllers\]\(controller.md\)\./, 'See [Language](language.md), [Functions](functions.md) and [Controllers](controller.md).');
  if (path === 'docs/collection.md') {
    body = body.split('## Native C++ operations')[0] + '\nSee [ORM](orm.md) for database queries.\n';
  }
  if (path === 'docs/view.md') {
    body = body.replace(/Installed application acceptance verifies[\s\S]*$/, '');
  }
  if (path === 'docs/security-hardening.md') {
    body = body.replace(/Optional protocol\/adaptor implementations remain subject[^\n]+\n/, '');
  }
  if (path === 'docs/logging-observability.md') {
    body = body.replace(/,\s*and \[the native OTLP exporter\]\([^)]*\)\./, '.');
  }
  if (path === 'docs/production-deployment.md') {
    body = body.replace(/Package version remains[^\n]+\n/, '');
    body = body.replace(/The acceptance suite\s*tests Supervisor directly; boot and the installed systemd unit still need\s*verification on your actual machine\./, 'Verify boot startup and the installed systemd unit on your deployment host.');
    body = body.replace(/external observability acceptance contract/g, 'external observability guide');
  }
  if (path === 'docs/getting-started.md') {
    body = body.replace(/`--check` performs structured-language semantic validation without native\s*compilation\. `gungnir build` additionally compiles routes and modules,\s*emits native code and builds the executable\./, '`--check` validates your source without building an executable. Use `gungnir build` to build the complete application, including routes and modules.');
  }
  if (path === 'docs/cli-codegen.md') {
    body = body.replace(/Generated bootstrap installs[\s\S]*?\n\n`GUNGNIR_CMAKE_PREFIX`/, 'Start workers and schedulers explicitly. Configure services in `bootstrap::configure` and additional registrations in `bootstrap::boot`.\n\n`GUNGNIR_CMAKE_PREFIX`');
  }
  // Adapter setup and SDK build flags are required usage instructions; compiler implementation is not.
  return body.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
}
