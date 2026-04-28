import type { OxlintConfig } from 'oxlint';

import { TS_PLUGINS } from '../_shared.js';
import { base } from './base.js';

/**
 * TypeScript config for pure TS projects (CLIs, libraries, utilities).
 * Type-aware rules are enabled — consumers must install `oxlint-tsgolint`.
 */
export const typescript: OxlintConfig = {
  extends: [base],
  plugins: [...TS_PLUGINS],
  options: {
    typeAware: true,
  },
  rules: {
    // TypeScript itself catches undefined identifiers via the type checker;
    // ESLint's `no-undef` is redundant and produces false positives for
    // ambient globals (typescript-eslint's official recommendation).
    'no-undef': 'off',

    'typescript/no-explicit-any': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/consistent-type-exports': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/await-thenable': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-import-type-side-effects': 'error',
    'typescript/no-implied-eval': 'error',
    'typescript/return-await': ['error', 'in-try-catch'],
    'typescript/no-deprecated': 'warn',
    'typescript/array-type': ['error', { default: 'array-simple' }],
    'typescript/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 10,
      },
    ],

    // Prefer `type` aliases over `interface` declarations.
    'typescript/consistent-type-definitions': ['error', 'type'],

    // `prefer-readonly-parameter-types` requires every parameter to be deeply
    // readonly — too extreme even for strict configs (typescript-eslint
    // itself does not recommend it). Consumers can opt in if they want.
    'typescript/prefer-readonly-parameter-types': 'off',

    // Cherry-picked from `restriction` category.
    'oxc/no-const-enum': 'error',
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',
    'typescript/use-unknown-in-catch-callback-variable': 'error',
    'typescript/no-dynamic-delete': 'error',

    // Force `x as T` over `<T>x` (the latter clashes with JSX).
    'typescript/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as' },
    ],
    // Prefer `Record<K, V>` over `{ [k: K]: V }`.
    'typescript/consistent-indexed-object-style': ['error', 'record'],
    // Prefer `new Map<K, V>()` over `const m: Map<K, V> = new Map()`.
    'typescript/consistent-generic-constructors': ['error', 'constructor'],
    // Drop redundant primitive type annotations like `let x: number = 1`.
    'typescript/no-inferrable-types': 'error',
  },
};
