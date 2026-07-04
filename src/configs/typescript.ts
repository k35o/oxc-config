import type { OxlintConfig } from 'oxlint';

import { TS_PLUGINS } from '../_shared.js';
import { base } from './base.js';

/**
 * TypeScript config for pure TS projects (CLIs, libraries, utilities).
 * Type-aware rules are enabled — consumers must install `oxlint-tsgolint`
 * (bundled by Vite+).
 *
 * Rules listed here are deltas from the inherited `base` config and the
 * category defaults; rules already at the desired severity are not repeated.
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
    // ambient globals (typescript-eslint's official recommendation). `base`
    // enables it for plain JS, so we turn it back off for TS.
    'no-undef': 'off',
    // The compiler resolves these too, so typescript-eslint disables them for
    // TS projects (false positives on namespace/re-export patterns).
    // `import/named` and `import/export` are additionally nursery-only, so
    // base's `nursery: 'off'` already disables them.
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',

    // Cherry-picked out of nursery (base turns the category off).
    'typescript/prefer-optional-chain': 'error',
    // `while (true)` and other literal loop guards are idiomatic; only flag
    // conditions the type system proves are always truthy/falsy.
    'typescript/no-unnecessary-condition': [
      'error',
      { allowConstantLoopConditions: 'only-allowed-literals' },
    ],

    'typescript/no-explicit-any': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/consistent-type-exports': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-import-type-side-effects': 'error',
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
    // `in-try-catch` keeps stack traces intact only where it matters. Pinned
    // because the default of a type-aware rule is not stable across versions.
    'typescript/return-await': ['error', 'in-try-catch'],

    // `prefer-readonly-parameter-types` requires every parameter to be deeply
    // readonly — too extreme even for strict configs (typescript-eslint
    // itself does not recommend it). Consumers can opt in if they want.
    'typescript/prefer-readonly-parameter-types': 'off',
    // CSS custom properties (`as CSSProperties`), JSON.parse results, and
    // synthetic event refinements all hit `no-unsafe-type-assertion` even
    // though they are the idiomatic way to express those values in TS.
    // The other unsafe-* rules still catch most real `any` leaks.
    'typescript/no-unsafe-type-assertion': 'off',
    // `onClick={() => setCount(c => c + 1)}` returns void intentionally;
    // ignore arrow shorthand so idiomatic React handlers do not fire.
    'typescript/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],

    // Cherry-picked from `restriction` category.
    'oxc/no-const-enum': 'error',
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',
    'typescript/use-unknown-in-catch-callback-variable': 'error',
    'typescript/no-dynamic-delete': 'error',
    // Namespaces are legacy TS; ESM modules replace them. `.d.ts` ambient
    // declarations are still allowed by default.
    'typescript/no-namespace': 'error',
    'typescript/no-invalid-void-type': 'error',

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
    // Property-style signatures (`foo: () => void`) opt into strictFunctionTypes
    // contravariance checks that method-style (`foo(): void`) skips.
    'typescript/method-signature-style': ['error', 'property'],
    'typescript/prefer-function-type': 'error',
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/unified-signatures': 'error',
    'typescript/prefer-reduce-type-parameter': 'error',
    'typescript/prefer-find': 'error',
    // `consistent-type-imports` tolerates mixed `import { type A, B }`; pin the
    // top-level form so it does not fight `no-import-type-side-effects`.
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  },
};
