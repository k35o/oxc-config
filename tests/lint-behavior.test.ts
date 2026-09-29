import { describe, expect, test } from 'vite-plus/test';

import { diagnose } from './oxlint.ts';

describe('idiomatic code lints clean', () => {
  test('typescript', () => {
    expect(diagnose('typescript', 'idiomatic/sample.ts')).toEqual([]);
  });
});

describe('typescript', () => {
  test('keeps its oxc rules when spread into the root config', () => {
    expect(
      diagnose('typescript', 'spread/sample.ts', 'spread.config.ts'),
    ).toEqual(['2 oxc(no-const-enum)']);
  });
});

describe('each problem is reported by exactly one rule', () => {
  test('typescript', () => {
    expect(diagnose('typescript', 'duplicates/sample.ts')).toEqual([
      '5 typescript(only-throw-error)',
      '9 typescript(prefer-promise-reject-errors)',
      '12 typescript(require-await)',
      '17 typescript(prefer-includes)',
      '21 typescript(prefer-find)',
      '25 unicorn(no-negated-condition)',
      '29 unicorn(no-instanceof-builtins)',
      '32 unicorn(new-for-builtins)',
      '34 unicorn(escape-case)',
    ]);
  });
});
