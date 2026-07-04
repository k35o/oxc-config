import type { OxlintConfig } from 'oxlint';

import { BASE_PLUGINS } from '../_shared.js';

/**
 * Base config: shared by every project regardless of stack.
 *
 * - Turns on the safety nets (`correctness`, `suspicious`, `perf`, `pedantic`)
 *   at error.
 * - Leaves stylistic rules off — formatting belongs to oxfmt or Prettier.
 * - Every rule listed below is a *delta* from the category defaults: an off,
 *   a warn, a non-default option, or a cherry-pick from an off category.
 *   Rules that merely restate a category's severity are not repeated here.
 *
 * Note: oxlint force-enables the `typescript` plugin even without it in
 * `plugins`, so TS files linted under bare `base` still get the raw category
 * severities for `typescript/*`. Use the `typescript` layer for TS projects —
 * it tunes the hostile ones (see typescript.ts).
 */
export const base: OxlintConfig = {
  plugins: [...BASE_PLUGINS],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    perf: 'error',
    pedantic: 'error',
    // `nursery` rules are unstable and oxlint auto-enables new ones on every
    // minor bump, so leaving this at error silently escalates unreviewed rules
    // to errors for consumers. We opt out wholesale and cherry-pick below.
    nursery: 'off',
    style: 'off',
    restriction: 'off',
  },
  rules: {
    // Cherry-picked out of `nursery` (see the category note above).
    'no-undef': 'error',
    'no-useless-assignment': 'error',
    'promise/no-return-in-finally': 'error',
    'unicorn/no-useless-iterator-to-array': 'error',

    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-param-reassign': 'error',
    'prefer-template': 'error',

    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    // Imports must precede other statements; oxfmt sorts imports but does not
    // hoist them past intervening code.
    'import/first': 'error',
    // Stylesheets and font files are imported for their side effects.
    'import/no-unassigned-import': [
      'error',
      { allow: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'] },
    ],

    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',

    'unicorn/no-array-for-each': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/throw-new-error': 'error',
    'unicorn/error-message': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-structured-clone': 'error',
    'unicorn/prefer-export-from': 'error',
    // Blanket `// eslint-disable` with no rule name hides unrelated violations;
    // pairs with the consumer's `reportUnusedDisableDirectives`.
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-useless-undefined': 'off',

    // Enforce kebab-case filenames. Next.js dynamic / route-group files
    // (`[id].tsx`, `(group)/page.tsx`) need overrides on the consumer.
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],

    // Cherry-picked from `restriction` category.
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/no-zero-fractions': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-empty': 'error',
    'no-alert': 'error',
    // Default exports are needed by Storybook stories, Next.js pages, and many
    // tooling configs, so `import/no-default-export` stays off — but anonymous
    // default exports (untraceable in stack traces) are still banned.
    'unicorn/no-anonymous-default-export': 'error',

    // Cherry-picked from `style` category.
    'unicorn/numeric-separators-style': 'error',
    'no-implicit-coercion': 'error',
    'no-template-curly-in-string': 'error',
    'object-shorthand': 'error',
    'prefer-object-spread': 'error',
    'prefer-object-has-own': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'logical-assignment-operators': 'error',
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
    'import/max-dependencies': 'off',

    // TODO / FIXME comments are an industry-standard tool, not a smell.
    'no-warning-comments': 'off',
  },
};
