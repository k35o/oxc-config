import { describe, expect, test } from 'vite-plus/test';

import { diagnose } from './oxlint.ts';

describe('idiomatic code lints clean', () => {
  test('typescript', () => {
    expect(diagnose('typescript', 'idiomatic/sample.ts')).toStrictEqual([]);
  });

  test('react', () => {
    expect(
      diagnose('react', 'idiomatic/sample.tsx', 'lint.config.ts'),
    ).toStrictEqual([]);
  });

  test('vitest files that import their globals', () => {
    expect(diagnose('test', 'idiomatic/sample.spec.ts')).toStrictEqual([]);
  });

  test('next.js metadata image routes using <img>', () => {
    expect(
      diagnose('nextjs', 'app/opengraph-image.tsx', 'lint.config.ts'),
    ).toStrictEqual([]);
  });
});

describe('typescript', () => {
  test('keeps its oxc rules when spread into the root config', () => {
    expect(
      diagnose('typescript', 'spread/sample.ts', 'spread.config.ts'),
    ).toStrictEqual(['2 oxc(no-const-enum)']);
  });
});

describe('nextjs', () => {
  test('warns about <img> outside metadata image routes', () => {
    expect(
      diagnose('nextjs', 'app/blog/sample.tsx', 'lint.config.ts'),
    ).toStrictEqual(['3 next(no-img-element)']);
  });
});

describe('each problem is reported by exactly one rule', () => {
  test('typescript', () => {
    expect(diagnose('typescript', 'duplicates/sample.ts')).toStrictEqual([
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

  test('react', () => {
    expect(
      diagnose('react', 'duplicates/sample.tsx', 'lint.config.ts'),
    ).toStrictEqual([
      '8 react-hooks(rules-of-hooks)',
      '12 react-hooks(exhaustive-deps)',
      '14 react-hooks(exhaustive-deps)',
      '16 react(no-unstable-nested-components)',
    ]);
  });
});
