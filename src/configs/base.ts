import type { OxlintConfig } from 'oxlint';

import { BASE_PLUGINS } from '../_shared.js';

/**
 * Base config: shared by every project regardless of stack.
 *
 * - Turns on the safety nets (`correctness`, `suspicious`) at error.
 * - Leaves stylistic rules off — formatting belongs to oxfmt or Prettier.
 */
export const base: OxlintConfig = {
  plugins: [...BASE_PLUGINS],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    perf: 'error',
    pedantic: 'error',
    nursery: 'error',
    style: 'off',
    restriction: 'off',
  },
  rules: {
    'no-debugger': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-eval': 'error',
    'no-throw-literal': 'error',
    'no-param-reassign': 'error',
    'prefer-template': 'error',

    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-default-export': 'error',

    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',

    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-array-for-each': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/throw-new-error': 'error',
    'unicorn/no-useless-undefined': 'off',

    // Enforce kebab-case filenames. Next.js dynamic / route-group files
    // (`[id].tsx`, `(group)/page.tsx`) need overrides on the consumer.
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],

    // Cherry-picked from `restriction` category.
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-number-properties': 'error',

    // Cherry-picked from `style` category.
    'unicorn/numeric-separators-style': 'error',
    'no-implicit-coercion': 'error',
    // Enforce destructuring for objects only — arrays are often clearer
    // accessed by index (e.g. `arr[0]`).
    'prefer-destructuring': ['error', { array: false, object: true }],
    'arrow-body-style': ['error', 'as-needed'],

    // Project-specific size limits — leave to the consumer.
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-depth': 'off',
    'max-classes-per-file': 'off',
    'max-nested-callbacks': 'off',

    // TODO / FIXME comments are an industry-standard tool, not a smell.
    'no-warning-comments': 'off',
  },
};
