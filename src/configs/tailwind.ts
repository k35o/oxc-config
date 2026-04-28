import type { OxlintConfig } from 'oxlint';

/**
 * Tailwind CSS v4 config using the `oxlint-tailwindcss` JS plugin.
 *
 * Compose this on top of `react`, `nextjs`, etc. by listing both in `extends`.
 * In monorepos, set `settings.tailwindcss.entryPoint` on the consumer side
 * for explicit resolution; auto-detection works for single-package setups.
 */
export const tailwind: OxlintConfig = {
  jsPlugins: ['oxlint-tailwindcss'],
  rules: {
    'tailwindcss/no-unknown-classes': 'error',
    'tailwindcss/no-duplicate-classes': 'error',
    'tailwindcss/no-conflicting-classes': 'error',
    'tailwindcss/no-deprecated-classes': 'error',
    'tailwindcss/no-unnecessary-whitespace': 'error',
    'tailwindcss/no-dark-without-light': 'warn',
    'tailwindcss/no-contradicting-variants': 'warn',

    'tailwindcss/enforce-canonical': 'warn',
    'tailwindcss/enforce-sort-order': 'warn',
    'tailwindcss/enforce-shorthand': 'warn',
    'tailwindcss/enforce-consistent-important-position': 'warn',
    'tailwindcss/enforce-negative-arbitrary-values': 'warn',
    'tailwindcss/enforce-consistent-variable-syntax': 'warn',
    'tailwindcss/consistent-variant-order': 'warn',
    'tailwindcss/no-hardcoded-colors': 'warn',
    'tailwindcss/no-unnecessary-arbitrary-value': 'warn',

    'tailwindcss/enforce-logical': 'off',
    'tailwindcss/enforce-physical': 'off',
    'tailwindcss/max-class-count': 'off',
    'tailwindcss/enforce-consistent-line-wrapping': 'off',
    'tailwindcss/no-restricted-classes': 'off',
    'tailwindcss/no-arbitrary-value': 'off',
  },
};
