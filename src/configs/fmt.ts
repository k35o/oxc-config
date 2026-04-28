import type { OxfmtConfig } from 'oxfmt';

/**
 * Default oxfmt preset.
 *
 * Opinionated for k8o's projects:
 * - single quotes (matches Prettier `singleQuote: true`)
 * - trailing commas everywhere they're legal
 * - 2-space indent, 80-column width
 * - sort imports + package.json keys
 * - sort Tailwind CSS class names
 *
 * Apply via Vite+ (`fmt:` field in `vite.config.ts`) or oxfmt directly
 * (`.oxfmtrc.json`-equivalent imported in code).
 */
export const fmt: OxfmtConfig = {
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  insertFinalNewline: true,
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  objectWrap: 'preserve',
  sortImports: true,
  sortPackageJson: true,
  sortTailwindcss: true,
  ignorePatterns: ['CHANGELOG.md', 'dist/**', 'node_modules/**'],
};
