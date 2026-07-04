import type { OxlintConfig } from 'oxlint';

import { TEST_PLUGINS } from '../_shared.js';

/**
 * Vitest test-file config. Apply via `overrides` on test globs in the consumer
 * (spread it: `overrides: [{ files: [...TEST_GLOBS], ...test }]`).
 *
 * Intentionally has no `extends` — base/typescript rules already apply through
 * the consumer's main config; this layer only adds vitest rules, provides the
 * test globals via `env`, and relaxes a few rules that are noisy in tests.
 *
 * Only rules the inherited categories do NOT already enable (or that we
 * downgrade / turn off) are listed; the vitest correctness rules
 * (`no-focused-tests`, `valid-expect`, …) come on automatically.
 */
export const test: OxlintConfig = {
  plugins: [...TEST_PLUGINS],
  env: { vitest: true },
  rules: {
    // Disabled tests are a work-in-progress signal, not an error.
    'vitest/no-disabled-tests': 'warn',

    // Off-category vitest rules we want enforced.
    'vitest/no-identical-title': 'error',
    'vitest/no-test-return-statement': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/no-importing-vitest-globals': 'error',
    'vitest/no-duplicate-hooks': 'error',
    'vitest/prefer-hooks-on-top': 'error',

    // Matcher / structure preferences (warn tier).
    'vitest/prefer-to-be': 'warn',
    'vitest/prefer-to-contain': 'warn',
    'vitest/prefer-to-have-length': 'warn',
    'vitest/prefer-strict-equal': 'warn',
    'vitest/prefer-equality-matcher': 'warn',
    'vitest/prefer-strict-boolean-matchers': 'warn',
    'vitest/consistent-each-for': 'warn',

    // Relax rules that are noisy or nonsensical in tests. `any` is common in
    // mocks/fixtures, so allowing it is pointless unless the unsafe-* family
    // (which fires the moment that `any` is used) is relaxed too.
    'typescript/no-non-null-assertion': 'off',
    'typescript/no-explicit-any': 'off',
    'typescript/no-floating-promises': 'off',
    'typescript/no-misused-promises': 'off',
    // `expect(obj.method)` / `vi.spyOn(obj, 'method')` are the classic
    // unbound-method false positives.
    'typescript/unbound-method': 'off',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-member-access': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/no-unsafe-argument': 'off',
    'typescript/no-unsafe-return': 'off',
  },
};
