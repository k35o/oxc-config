import type { OxlintConfig } from 'oxlint';

import { TEST_PLUGINS } from '../_shared.js';

/**
 * Vitest test-file config. Apply via `overrides` on test globs in the consumer
 * (spread it: `overrides: [{ files: [...TEST_GLOBS], ...test }]`).
 *
 * Intentionally has no `extends` — base/typescript rules already apply through
 * the consumer's main config; this layer only adds vitest rules and relaxes a
 * few rules that are noisy in tests.
 *
 * Only rules the inherited categories do NOT already enable (or that we
 * downgrade / turn off) are listed; the vitest correctness rules
 * (`no-focused-tests`, `valid-expect`, …) come on automatically.
 */
export const test: OxlintConfig = {
  plugins: [...TEST_PLUGINS],
  rules: {
    // Disabled and todo tests are a work-in-progress signal, not an error.
    'vitest/no-disabled-tests': 'warn',
    'vitest/warn-todo': 'warn',
    // Rejects type-narrowing guards (`if (!result.ok) throw …`) in a test.
    'vitest/no-conditional-in-test': 'warn',
    // Rejects a bare `vi.fn()`; the mock's type rarely matters to the test.
    'vitest/require-mock-type-parameters': 'off',

    // Off-category vitest rules we want enforced.
    'vitest/no-identical-title': 'error',
    'vitest/no-test-return-statement': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/no-duplicate-hooks': 'error',
    'vitest/prefer-hooks-on-top': 'error',
    'vitest/no-unneeded-async-expect-function': 'error',
    'vitest/no-interpolation-in-snapshots': 'error',
    'vitest/no-mocks-import': 'error',
    // Vitest's `globals` option is off by default, so test APIs are imported.
    'vitest/prefer-importing-vitest-globals': 'error',

    // Matcher / structure preferences (warn tier).
    'vitest/prefer-to-be': 'warn',
    'vitest/prefer-to-contain': 'warn',
    'vitest/prefer-to-have-length': 'warn',
    'vitest/prefer-strict-equal': 'warn',
    'vitest/prefer-equality-matcher': 'warn',
    'vitest/prefer-comparison-matcher': 'warn',
    'vitest/prefer-strict-boolean-matchers': 'warn',
    'vitest/prefer-to-have-been-called-times': 'warn',
    'vitest/prefer-called-exactly-once-with': 'warn',
    'vitest/prefer-mock-promise-shorthand': 'warn',
    'vitest/prefer-spy-on': 'warn',
    'vitest/prefer-hooks-in-order': 'warn',
    'vitest/no-alias-methods': 'warn',

    // Relax rules that are noisy or nonsensical in tests. `any` is common in
    // mocks/fixtures, so allowing it is pointless unless the unsafe-* family
    // (which fires the moment that `any` is used) is relaxed too.
    // `no-floating-promises` deliberately stays on: an un-awaited assertion or
    // interaction makes a test pass without checking anything.
    'typescript/no-non-null-assertion': 'off',
    'typescript/no-explicit-any': 'off',
    'typescript/no-misused-promises': 'off',
    // Async mock implementations and fixtures often have nothing to await.
    'typescript/require-await': 'off',
    // `expect(obj.method)` / `vi.spyOn(obj, 'method')` are the classic
    // unbound-method false positives.
    'typescript/unbound-method': 'off',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-member-access': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/no-unsafe-argument': 'off',
    'typescript/no-unsafe-return': 'off',
    // Helpers and factories are declared inside the `describe` they serve.
    'unicorn/consistent-function-scoping': 'off',
  },
};
