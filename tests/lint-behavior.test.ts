import { describe, expect, test } from 'vite-plus/test';

import { diagnose } from './oxlint.ts';

describe('typescript', () => {
  test('keeps its oxc rules when spread into the root config', () => {
    expect(
      diagnose('typescript', 'spread/sample.ts', 'spread.config.ts'),
    ).toEqual(['2 oxc(no-const-enum)']);
  });
});
