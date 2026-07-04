/**
 * Plugin sets used across configs.
 *
 * oxlint always enables `eslint` core rules and force-enables the `typescript`
 * and `oxc` plugins, so those never need listing. `unicorn` is on by default
 * too but we keep it explicit since the base layer leans on it heavily. Every
 * other plugin is opt-in and must be listed by the first layer that needs it.
 *
 * Oxlint *replaces* (not merges) the `plugins` array when a config sets it, so
 * each layer repeats the opt-in plugins of its parents.
 *
 * Note: `react-hooks` is bundled into the `react` plugin, so it does not appear
 * here as a separate entry.
 */

export const BASE_PLUGINS = ['unicorn', 'import', 'promise'] as const;

export const TS_PLUGINS = [...BASE_PLUGINS, 'typescript'] as const;

export const REACT_PLUGINS = [...TS_PLUGINS, 'react', 'jsx-a11y'] as const;

export const NEXTJS_PLUGINS = [...REACT_PLUGINS, 'nextjs'] as const;

export const BACKEND_PLUGINS = [...TS_PLUGINS, 'node'] as const;

// Vitest reimplements the shared `jest/*` rules under `vitest/*`, so enabling
// both would double-report every violation. Vitest-only projects need only it.
export const TEST_PLUGINS = ['vitest'] as const;

/**
 * Canonical test-file globs, exported so consumers can reuse them in the
 * `overrides` entry that applies the `test` config without hand-copying the
 * `.test` / `.spec` matrix (and drifting from it).
 */
export const TEST_GLOBS = [
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  '**/*.spec.tsx',
] as const;

/**
 * Storybook story-file globs, for the `overrides` entry that applies the
 * `storybook` config. `.storybook/main.*` is a separate concern (see the
 * storybook config docs).
 */
export const STORYBOOK_GLOBS = [
  '**/*.stories.ts',
  '**/*.stories.tsx',
  '**/*.stories.js',
  '**/*.stories.jsx',
  '**/*.story.ts',
  '**/*.story.tsx',
] as const;

/**
 * Playwright e2e-spec globs. Kept distinct from `TEST_GLOBS` (`.e2e.*` / an
 * `e2e/` dir) so unit-test and e2e files do not both match — a `.spec.ts`
 * under `e2e/` gets Playwright rules, one next to source gets Vitest rules.
 */
export const PLAYWRIGHT_GLOBS = [
  '**/*.e2e.ts',
  '**/*.e2e.tsx',
  'e2e/**/*.ts',
  'e2e/**/*.tsx',
] as const;
