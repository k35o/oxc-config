import type { OxlintConfig } from 'oxlint';

import { TEST_PLUGINS } from '../_shared.js';

/**
 * Vitest test-file config. Apply via `overrides` on test globs in the consumer.
 *
 * Intentionally has no `extends` — base/typescript rules already apply through
 * the consumer's main config; this layer only adds test-specific rules and
 * relaxes a few rules that are noisy in tests.
 *
 * Note: oxlint reuses the `jest` plugin for general test patterns
 * (`it`, `describe`, `expect`). The `vitest` plugin holds vitest-specific rules.
 * Both are enabled here so vitest projects get the full coverage.
 */
export const test: OxlintConfig = {
  plugins: [...TEST_PLUGINS],
  rules: {
    'jest/no-focused-tests': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/expect-expect': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-conditional-expect': 'error',
    'jest/no-conditional-in-test': 'error',
    'jest/no-standalone-expect': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/valid-describe-callback': 'error',
    'jest/valid-expect': 'error',
    'jest/valid-title': 'error',
    'jest/no-export': 'error',
    'jest/prefer-to-be': 'warn',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',

    'vitest/no-conditional-tests': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/no-importing-vitest-globals': 'error',
    'vitest/require-awaited-expect-poll': 'error',
    'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
    'vitest/hoisted-apis-on-top': 'error',
    'vitest/consistent-each-for': 'warn',

    'typescript/no-non-null-assertion': 'off',
    'typescript/no-explicit-any': 'off',
    'typescript/no-floating-promises': 'off',
    'typescript/no-misused-promises': 'off',
  },
};
