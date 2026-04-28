/**
 * Plugin sets used across configs.
 *
 * Oxlint replaces (not merges) the `plugins` array when a config sets it,
 * so each layer must list every plugin it depends on, including parents.
 *
 * Notes on naming:
 * - `react-hooks` is bundled into the `react` plugin, so it does not appear
 *   here as a separate entry.
 */

export const BASE_PLUGINS = [
  'eslint',
  'oxc',
  'unicorn',
  'import',
  'promise',
] as const;

export const TS_PLUGINS = [...BASE_PLUGINS, 'typescript'] as const;

export const REACT_PLUGINS = [
  ...TS_PLUGINS,
  'react',
  'jsx-a11y',
  'react-perf',
] as const;

export const NEXTJS_PLUGINS = [...REACT_PLUGINS, 'nextjs'] as const;

export const BACKEND_PLUGINS = [...TS_PLUGINS, 'node'] as const;

export const TEST_PLUGINS = ['jest', 'vitest'] as const;
