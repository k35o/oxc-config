# Recipe: Monorepo

Each package gets its own config that `extends` the layer it needs. Two settings
usually need to be explicit in a monorepo because auto-detection is per-CWD.

## Per-package config

```ts
// packages/web/vite.config.ts
import { defineConfig } from 'vite-plus';
import { fmt, nextjs, tailwind, test, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  fmt,
  lint: {
    extends: [nextjs, tailwind],
    options: { reportUnusedDisableDirectives: 'error', typeAware: true },
    settings: {
      react: { version: '19.0.0' },
      // Point the Next.js plugin at this package's root, not the repo root.
      next: { rootDir: 'packages/web' },
      // Resolve Tailwind against this package's entry stylesheet.
      tailwindcss: { entryPoint: 'packages/web/src/app/globals.css' },
    },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
  },
});
```

```ts
// packages/core/vite.config.ts — a pure TS package, no React
import { defineConfig } from 'vite-plus';
import { fmt, test, typescript, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  fmt,
  lint: {
    extends: [typescript],
    options: { reportUnusedDisableDirectives: 'error', typeAware: true },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
  },
});
```

## Why the settings are explicit

- **`settings.next.rootDir`** — `nextjs/no-html-link-for-pages` resolves your
  `pages`/`app` directory relative to this. Without it, the plugin looks at the
  monorepo root and misfires.
- **`settings.tailwindcss.entryPoint`** — `oxlint-tailwindcss` needs to know
  which stylesheet defines your theme so it can validate class names. In a single
  package it auto-detects; across packages it cannot, so set it (a string for one
  entry, or an array of `{ files, use }` mappings for several).

## `reportUnusedDisableDirectives` and `typeAware`

These are **per-config options**, not inherited through `extends`. Set them on
every package's config (as above). `typeAware` additionally needs each package to
have a resolvable `tsconfig.json`.

## Shared internal preset

If several packages share a stack, wrap the common config once in an internal
package and re-export it, rather than repeating the `extends`/`settings` block:

```ts
// packages/config-lint/index.ts
import { nextjs, tailwind } from '@k8o/oxc-config';
export const web = {
  extends: [nextjs, tailwind],
  settings: { react: { version: '19.0.0' } },
};
```

Consumers then `extends: [web.extends].flat()` — but keep the `options` (root-only
`reportUnusedDisableDirectives`) in each leaf config.
