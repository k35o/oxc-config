import type { OxlintConfig } from 'vite-plus/lint';

/**
 * Tailwind CSS v4 config using the `oxlint-tailwindcss` JS plugin.
 *
 * Compose this on top of `react`, `nextjs`, etc. by listing both in `extends`.
 * The consumer must set `settings.tailwindcss.entryPoint` to the CSS entry
 * file: without it every rule that reads the design system reports a
 * configuration error instead of linting.
 *
 * Every rule the plugin ships carries an explicit decision below; the test
 * suite fails when a plugin update adds one that is not listed.
 */
export const tailwind: OxlintConfig = {
  jsPlugins: ['oxlint-tailwindcss'],
  rules: {
    // The class-resolution flakiness that had this off was fixed upstream in
    // 1.3.1/1.3.2 (hence the >=1.3.2 peer floor); warn catches typo'd classes
    // without failing CI while the fix beds in.
    'tailwindcss/no-unknown-classes': 'warn',
    'tailwindcss/no-duplicate-classes': 'error',
    'tailwindcss/no-conflicting-classes': 'error',
    'tailwindcss/no-deprecated-classes': 'error',
    'tailwindcss/no-unnecessary-whitespace': 'error',
    'tailwindcss/no-dark-without-light': 'warn',
    'tailwindcss/no-contradicting-variants': 'warn',

    'tailwindcss/enforce-canonical': 'warn',
    // oxfmt's `sortTailwindcss: true` already canonically orders classes;
    // running this rule on top would just duplicate the work.
    'tailwindcss/enforce-sort-order': 'off',
    'tailwindcss/enforce-shorthand': 'warn',
    'tailwindcss/enforce-consistent-important-position': 'warn',
    'tailwindcss/enforce-negative-arbitrary-values': 'warn',
    'tailwindcss/enforce-consistent-variable-syntax': 'warn',
    'tailwindcss/consistent-variant-order': 'warn',
    'tailwindcss/no-hardcoded-colors': 'warn',
    // Its fix rewrites `border-(--border)` to `border-border`, which changes
    // the CSS when the theme wraps the variable (`hsl(var(--border))`).
    'tailwindcss/prefer-theme-tokens': 'off',
    'tailwindcss/no-unnecessary-arbitrary-value': 'warn',

    'tailwindcss/enforce-logical': 'off',
    'tailwindcss/enforce-physical': 'off',
    'tailwindcss/max-class-count': 'off',
    'tailwindcss/enforce-consistent-line-wrapping': 'off',
    'tailwindcss/no-restricted-classes': 'off',
    'tailwindcss/no-arbitrary-value': 'off',
    // Suggests `w-50` for `w-[200px]`: equal only at a 16px root font size, and
    // a fixed pixel length is usually chosen on purpose.
    'tailwindcss/prefer-scale-token': 'off',
  },
};
