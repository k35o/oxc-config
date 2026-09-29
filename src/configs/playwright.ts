import type { OxlintConfig } from 'oxlint';

/**
 * Playwright e2e config via the `eslint-plugin-playwright` JS plugin.
 *
 * Apply via `overrides` on e2e globs (spread it:
 * `overrides: [{ files: [...PLAYWRIGHT_GLOBS], ...playwright }]`). Consumers
 * install `eslint-plugin-playwright` as a peer. Rules mirror the plugin's
 * `flat/recommended` config.
 *
 * `PLAYWRIGHT_GLOBS` overlaps `TEST_GLOBS` under `e2e/`, so exclude it from the
 * Vitest override (`excludeFiles: [...PLAYWRIGHT_GLOBS]`).
 */
export const playwright: OxlintConfig = {
  jsPlugins: ['eslint-plugin-playwright'],
  rules: {
    // Playwright requires a fixture's first parameter to be an object
    // destructuring pattern, even an empty one: `async ({}, use) => {}`.
    'no-empty-pattern': 'off',

    'playwright/consistent-spacing-between-blocks': 'warn',
    'playwright/expect-expect': 'warn',
    'playwright/max-nested-describe': 'warn',
    'playwright/missing-playwright-await': 'error',
    'playwright/no-conditional-expect': 'warn',
    'playwright/no-conditional-in-test': 'warn',
    'playwright/no-duplicate-hooks': 'warn',
    'playwright/no-duplicate-slow': 'warn',
    'playwright/no-element-handle': 'warn',
    'playwright/no-eval': 'warn',
    'playwright/no-focused-test': 'error',
    'playwright/no-identical-title': 'warn',
    'playwright/no-force-option': 'warn',
    'playwright/no-nested-step': 'warn',
    'playwright/no-networkidle': 'error',
    'playwright/no-page-pause': 'warn',
    'playwright/no-skipped-test': 'warn',
    'playwright/no-standalone-expect': 'error',
    'playwright/no-unnecessary-assertions': 'error',
    'playwright/no-unsafe-references': 'error',
    'playwright/no-unused-locators': 'error',
    'playwright/no-useless-await': 'warn',
    'playwright/no-useless-not': 'warn',
    'playwright/no-wait-for-navigation': 'error',
    'playwright/no-wait-for-selector': 'warn',
    'playwright/no-wait-for-timeout': 'warn',
    'playwright/prefer-hooks-in-order': 'warn',
    'playwright/prefer-hooks-on-top': 'warn',
    'playwright/prefer-locator': 'warn',
    'playwright/prefer-to-have-count': 'warn',
    'playwright/prefer-to-have-length': 'warn',
    'playwright/prefer-web-first-assertions': 'error',
    'playwright/valid-describe-callback': 'error',
    'playwright/valid-expect': 'error',
    'playwright/valid-expect-in-promise': 'error',
    'playwright/valid-test-tags': 'error',
    'playwright/valid-title': 'error',
  },
};
