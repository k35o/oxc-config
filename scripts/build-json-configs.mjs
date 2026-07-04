// Emit plain-JSON variants of the lint / fmt presets so consumers who use a
// `.oxlintrc.json` / `.oxfmtrc.json` (no TS/ESM config loader) can `extends`
// them by relative path. Runs after `vp pack`, reading the freshly built
// `dist/**.mjs`.
//
// oxlint's JSON `extends` takes file paths, not npm specifiers, so each layer's
// `extends` object reference is rewritten to a sibling JSON path per the known
// layer graph (mirroring src/configs/*.ts).
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = resolve(import.meta.dirname, '..', 'dist');

// layer -> parent layer whose JSON it extends (null = standalone root)
const lintGraph = {
  base: null,
  typescript: 'base',
  react: 'typescript',
  nextjs: 'react',
  backend: 'typescript',
  tailwind: null,
  regexp: null,
};

async function load(name) {
  const url = pathToFileURL(resolve(distDir, 'configs', `${name}.mjs`)).href;
  const mod = await import(url);
  return mod[name];
}

for (const [layer, parent] of Object.entries(lintGraph)) {
  const cfg = { ...(await load(layer)) };
  delete cfg.extends;
  const json =
    parent === null ? cfg : { extends: [`./${parent}.oxlintrc.json`], ...cfg };
  const outFile = resolve(distDir, `${layer}.oxlintrc.json`);
  writeFileSync(outFile, `${JSON.stringify(json, null, 2)}\n`);
  process.stdout.write(`✓ dist/${layer}.oxlintrc.json\n`);
}

const fmt = await load('fmt');
writeFileSync(
  resolve(distDir, 'fmt.oxfmtrc.json'),
  `${JSON.stringify(fmt, null, 2)}\n`,
);
process.stdout.write('✓ dist/fmt.oxfmtrc.json\n');
