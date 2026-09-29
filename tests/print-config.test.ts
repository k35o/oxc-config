import { describe, expect, test } from 'vite-plus/test';

import { runLint } from './vp-lint.ts';

// Only layers whose rules are native oxlint plugins are snapshot-tested here.
// jsPlugin layers (tailwind, html-nest) are covered by
// js-plugins.test because `--print-config` drops their rules (oxc#22117).
const fixtures = [
  'base',
  'typescript',
  'react',
  'nextjs',
  'backend',
  'test',
] as const;

describe('print-config snapshots', () => {
  for (const name of fixtures) {
    test(name, () => {
      const { status, stdout, stderr } = runLint(name, [
        '--print-config',
        '-c',
        'vite.config.ts',
      ]);
      expect(
        status,
        `vp lint --print-config failed for "${name}":\nstderr:\n${stderr}\nstdout:\n${stdout}`,
      ).toBe(0);
      const config: unknown = JSON.parse(stdout);
      expect(config).toMatchSnapshot();
    });
  }
});
