import type { OxfmtConfig } from 'oxfmt';

/**
 * Default oxfmt preset.
 *
 * Only the keys that actually deviate from oxfmt's defaults — plus a few that
 * match the default but are pinned so a stray `.editorconfig` cannot override
 * them — are set here. oxfmt's own defaults cover the rest (double-quoted JSX,
 * trailing commas, semicolons, `always` arrow parens, …).
 *
 * Apply via Vite+ (`fmt:` field in `vite.config.ts`) or oxfmt directly
 * (`.oxfmtrc.json`-equivalent imported in code / the generated
 * `@k8o/oxc-config/dist/fmt.oxfmtrc.json`).
 *
 * `ignorePatterns` is intentionally omitted: setting it here would be silently
 * clobbered the moment a consumer sets their own, and repo-specific ignores
 * (CHANGELOG.md, generated dirs) belong in the consumer's config.
 */
export const fmt: OxfmtConfig = {
  // Real opinions — differ from oxfmt's defaults.
  singleQuote: true, // default: false
  printWidth: 80, // default: 100
  sortImports: true, // default: disabled
  sortTailwindcss: true, // default: disabled

  // Match the oxfmt defaults, but pin them so an editor's `.editorconfig`
  // cannot change indentation / line endings / final newline out from under us.
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  insertFinalNewline: true,
};
