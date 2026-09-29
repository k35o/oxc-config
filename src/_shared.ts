/**
 * Plugin sets used across configs.
 *
 * oxlint always runs the `eslint` core rules. `typescript`, `unicorn` and `oxc`
 * are on by default too, but only while no config sets `plugins`: spreading a
 * layer into the root config (or listing `plugins` there) replaces the default
 * set. Every plugin a layer relies on is therefore listed explicitly — `oxc`
 * included, or `oxc/*` rules silently stop running for those consumers.
 *
 * Oxlint *replaces* (not merges) the `plugins` array when a config sets it, so
 * each layer repeats the opt-in plugins of its parents.
 *
 * Note: `react-hooks` is bundled into the `react` plugin, so it does not appear
 * here as a separate entry.
 */

export const BASE_PLUGINS = ['unicorn', 'oxc', 'import', 'promise'] as const;

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
