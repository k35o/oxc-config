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
 * Note: oxlint keeps the `typescript` plugin on by default, so TS files linted
 * under bare `base` still get the raw category severities for `typescript/*`.
 * Use the `typescript` layer for TS projects — it tunes the hostile ones (see
 * typescript.ts).
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
    // `no-undef` needs the consumer's `env` to know the runtime's globals;
    // oxlint does not inherit `env` through `extends`, so it cannot be set here.
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
    'import/no-named-default': 'error',
    // Imports must precede other statements; oxfmt sorts imports but does not
    // hoist them past intervening code.
    'import/first': 'error',

    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/param-names': 'error',
    // A terminal `.then()` that only runs a side effect has nothing to return.
    'promise/always-return': ['error', { ignoreLastCallback: true }],

    'unicorn/no-array-for-each': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-classlist-toggle': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/throw-new-error': 'error',
    'unicorn/error-message': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-structured-clone': 'error',
    'unicorn/prefer-export-from': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
    'unicorn/prefer-bigint-literals': 'error',
    'unicorn/prefer-response-static-json': 'error',
    'unicorn/consistent-date-clone': 'error',
    'unicorn/consistent-existence-index-check': 'error',
    'unicorn/no-useless-collection-argument': 'error',
    'unicorn/require-array-join-separator': 'error',
    // Blanket `// eslint-disable` with no rule name hides unrelated violations;
    // pairs with the consumer's `reportUnusedDisableDirectives`.
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-useless-undefined': 'off',
    // Local arrow helpers keep related logic next to where it is used.
    'unicorn/consistent-function-scoping': [
      'error',
      { checkArrowFunctions: false },
    ],

    // Enforce kebab-case filenames. The `nextjs` layer relaxes this for
    // dynamic-segment files (`[id].tsx`).
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],

    // Cherry-picked from `restriction` category.
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/no-useless-error-capture-stack-trace': 'error',
    'oxc/bad-bitwise-operator': 'error',
    'no-sequences': 'error',
    'no-regex-spaces': 'error',
    'no-proto': 'error',
    'no-empty': 'error',
    'no-alert': 'error',
    // Default exports are needed by Next.js pages and many tooling configs, so
    // `import/no-default-export` stays off — but anonymous default exports
    // (untraceable in stack traces) are still banned.
    'unicorn/no-anonymous-default-export': 'error',

    // Cherry-picked from `style` category.
    'unicorn/numeric-separators-style': 'error',
    'unicorn/no-zero-fractions': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-implicit-coercion': 'error',
    'no-template-curly-in-string': 'error',
    'no-useless-computed-key': 'error',
    'no-return-assign': 'error',
    'no-lone-blocks': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'object-shorthand': 'error',
    'prefer-object-spread': 'error',
    'prefer-object-has-own': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-exponentiation-operator': 'error',
    'logical-assignment-operators': 'error',
    'arrow-body-style': 'error',
    'one-var': ['error', { initialized: 'never' }],
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    // Named function expressions stay allowed: `memo(function Card() {})`
    // is how a wrapped component keeps its display name.
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    // Declarations only, objects only. Arrays are often clearer accessed by
    // index (`arr[0]`), and destructuring an assignment (`cursor = page.cursor`)
    // needs the awkward `({ cursor } = page)`.
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: false },
      },
    ],

    // `x == null` is the idiomatic check for both `null` and `undefined`.
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // Enabled by the categories above, but each rejects idiomatic code:
    // trailing comments, regexes without the `u` flag, `_id` / `__typename`
    // fields, `values.map(parse)`, `if (items.length)`, the
    // `new Promise((resolve) => setTimeout(resolve, ms))` sleep and sequential
    // awaits (retries, cursor pagination).
    'no-inline-comments': 'off',
    'require-unicode-regexp': 'off',
    'no-underscore-dangle': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/explicit-length-check': 'off',
    'no-promise-executor-return': 'off',
    'no-await-in-loop': 'off',
    // Its suggested `Math.trunc(Number(value))` parses `'10px'` and `''`
    // differently from `Number.parseInt(value, 10)`.
    'unicorn/prefer-number-coercion': 'off',
    // Cannot tell a Worker, MessagePort or BroadcastChannel (which take no
    // target origin) from `window.postMessage`.
    'unicorn/require-post-message-target-origin': 'off',
    // ES modules are strict, where block-level functions are block-scoped.
    'no-inner-declarations': 'off',
    // Side-effect imports (`server-only`, polyfills, stylesheets) are always
    // deliberate.
    'import/no-unassigned-import': 'off',
    // `one-var` already forbids the combined declarations this would sort.
    'sort-vars': 'off',

    // Each of these duplicates a rule that stays on, so every hit was reported
    // twice: `unicorn/no-negated-condition`, `unicorn/new-for-builtins`,
    // `unicorn/no-instanceof-builtins` and `unicorn/escape-case` respectively.
    'no-negated-condition': 'off',
    'no-new-wrappers': 'off',
    'unicorn/no-instanceof-array': 'off',
    'unicorn/no-hex-escape': 'off',

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
