# Recipe: Next.js App Router

The `nextjs` layer extends `react` → `typescript` → `base`, so it covers the
whole stack. Compose `tailwind` on top if you use Tailwind CSS v4, and apply the
`test` layer on your test globs.

## Vite+

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus';
import { fmt, nextjs, tailwind, test, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  fmt,
  lint: {
    extends: [nextjs, tailwind],
    options: {
      reportUnusedDisableDirectives: 'error',
      typeAware: true,
    },
    settings: {
      react: { version: '19.0.0' },
    },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
  },
  staged: {
    '*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}': 'vp check --fix',
  },
});
```

## Standalone oxlint

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { nextjs, tailwind, test, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  extends: [nextjs, tailwind],
  options: { reportUnusedDisableDirectives: 'error' },
  settings: { react: { version: '19.0.0' } },
  overrides: [{ files: [...TEST_GLOBS], ...test }],
});
```

Install `oxlint-tailwindcss` and `oxlint-tsgolint` alongside `oxlint`
(Vite+ bundles the latter).

## Filenames

`base` enforces `unicorn/filename-case` as kebab-case. The `nextjs` layer already
whitelists dynamic-segment files (`[id].tsx`, `[...slug].tsx`, `[[...slug]].tsx`).
Route-group and parallel-route **folders** (`(marketing)`, `@modal`) are
directories, which the rule does not check, so they need no extra config.

If you keep PascalCase component filenames, override the rule for your components
directory instead of fighting it file by file:

```ts
overrides: [
  {
    files: ['app/**/_components/**/*.tsx'],
    rules: { 'unicorn/filename-case': ['error', { case: 'pascalCase' }] },
  },
],
```

## Server vs client

The `nextjs` layer's correctness rules (e.g. `no-html-link-for-pages`,
`no-sync-scripts`) run everywhere. There is no separate server/client split —
Server Components are still React, so `react` and `jsx-a11y` rules apply to them
too. Route handlers and server actions that log to stdout will trip
`no-console` (warn); relax it per-file if that is intentional, or apply the
`backend` layer's philosophy to your `app/api` routes via an override.

## Tailwind settings

Single-package apps auto-detect the Tailwind entry point. Only set
`settings.tailwindcss.entryPoint` explicitly in a monorepo — see the
[monorepo recipe](./monorepo.md).
