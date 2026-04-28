import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, test } from 'vite-plus/test';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

// Resolve the standalone oxlint binary directly. The bin shim in `.bin/oxlint`
// is provided by vite-plus and only handles `--lsp`, so we go through the
// `oxlint` package itself to drive the CLI.
const oxlintBin = resolve(repoRoot, 'node_modules', 'oxlint', 'bin', 'oxlint');

const fixtures = [
  'base',
  'typescript',
  'react',
  'nextjs',
  'backend',
  'test',
  'tailwind',
] as const;

describe('print-config snapshots', () => {
  for (const name of fixtures) {
    test(name, () => {
      const cwd = resolve(here, 'fixtures', name);
      let output = '';
      try {
        // Use a clean env: vp test injects vite-plus paths into NODE_OPTIONS /
        // NODE_PATH, which makes the standalone oxlint binary resolve
        // vite-plus's config loader and reject our oxlint.config.ts.
        const cleanEnv = {
          PATH: process.env.PATH ?? '',
          HOME: process.env.HOME ?? '',
        };
        output = execFileSync(
          process.execPath,
          [oxlintBin, '--print-config', '-c', 'oxlint.config.ts'],
          {
            cwd,
            encoding: 'utf8',
            env: cleanEnv,
            stdio: ['ignore', 'pipe', 'pipe'],
          },
        );
      } catch (err) {
        // execFileSync with encoding: 'utf8' attaches stderr/stdout strings
        // to the thrown error, but the exception is typed as `unknown`.
        const isObj = typeof err === 'object' && err !== null;
        const stderr =
          isObj && 'stderr' in err && typeof err.stderr === 'string'
            ? err.stderr
            : '';
        const stdout =
          isObj && 'stdout' in err && typeof err.stdout === 'string'
            ? err.stdout
            : '';
        throw new Error(
          `oxlint --print-config failed for "${name}":\nstderr:\n${stderr}\nstdout:\n${stdout}`,
          { cause: err },
        );
      }
      const config: unknown = JSON.parse(output);
      expect(config).toMatchSnapshot();
    });
  }
});
