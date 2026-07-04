import type { OxlintConfig } from 'oxlint';

/**
 * Storybook story-file config via the `eslint-plugin-storybook` JS plugin.
 *
 * Apply via `overrides` on story globs (spread it:
 * `overrides: [{ files: [...STORYBOOK_GLOBS], ...storybook }]`). Rules mirror
 * the plugin's `recommended` story-file block.
 *
 * Peers: `eslint-plugin-storybook` **and** `storybook` itself — the plugin
 * imports `storybook` at load time, so oxlint can only load this layer inside a
 * real Storybook project. `.storybook/main.*` addon linting
 * (`storybook/no-uninstalled-addons`) is a separate override the consumer adds
 * on that path.
 */
export const storybook: OxlintConfig = {
  jsPlugins: ['eslint-plugin-storybook'],
  rules: {
    'storybook/await-interactions': 'error',
    'storybook/context-in-play-function': 'error',
    'storybook/default-exports': 'error',
    'storybook/hierarchy-separator': 'warn',
    'storybook/no-redundant-story-name': 'warn',
    'storybook/no-renderer-packages': 'error',
    'storybook/prefer-pascal-case': 'warn',
    'storybook/story-exports': 'error',
    'storybook/use-storybook-expect': 'error',
    'storybook/use-storybook-testing-library': 'error',

    // A `Meta` default export object is legitimately anonymous, and hook rules
    // do not apply to story render functions.
    'unicorn/no-anonymous-default-export': 'off',
    'react/rules-of-hooks': 'off',
  },
};
