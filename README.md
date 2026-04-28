# `@k35o/oxc-config`

Shareable [oxlint](https://oxc.rs/docs/guide/usage/linter) + [oxfmt](https://github.com/oxc-project/oxfmt) configurations for TypeScript / React / Next.js / Backend / Tailwind / Test projects.

Strict by default. Composable via oxlint's native `extends`.

## Install

### With [Vite+](https://viteplus.dev/) (`vite-plus`)

Vite+ bundles oxlint, oxfmt, and `oxlint-tsgolint`, so you only need to add this config (and the optional Tailwind plugin):

```bash
pnpm add -D vite-plus @k35o/oxc-config
# Optional: only when you use the `tailwind` lint config
pnpm add -D oxlint-tailwindcss @oxlint/plugins
```

`@oxlint/plugins` is a peer dep of `oxlint-tailwindcss`. Pin it to the same major version as the oxlint that ships inside your `vite-plus` (check with `vp --version`).

### With standalone oxlint / oxfmt

```bash
pnpm add -D oxlint @k35o/oxc-config
# Add only what you actually use:
pnpm add -D oxfmt                # if you use the `fmt` preset
pnpm add -D oxlint-tailwindcss   # if you use the `tailwind` lint config
pnpm add -D oxlint-tsgolint      # for type-aware rules (typescript / react / nextjs / backend)
```

## Quick start

### With Vite+

`vp lint` reads the `lint:` field of `vite.config.ts`, and `vp fmt` reads `fmt:`. Both accept the same shape as a standalone `oxlint.config.ts` / `.oxfmtrc.json`. Spread our presets in:

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus';
import { fmt, nextjs, tailwind, test } from '@k35o/oxc-config';

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
    overrides: [
      {
        files: ['**/*.test.ts', '**/*.test.tsx'],
        plugins: [...(test.plugins ?? [])],
        rules: test.rules ?? {},
      },
    ],
  },
  staged: {
    '*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}': 'vp check --fix',
  },
});
```

`package.json` scripts:

```jsonc
{
  "scripts": {
    "lint": "vp lint",
    "fmt": "vp fmt",
    "check": "vp check", // = fmt + lint + tsc
    "check:write": "vp check --fix",
  },
}
```

Notes for Vite+ users:

- Don't install `oxlint`, `oxfmt`, or `oxlint-tsgolint` directly — Vite+ wraps them. `oxlint-tailwindcss` is a JS plugin, so it stays a separate install.
- Type-aware rules work out of the box (no separate `oxlint-tsgolint` install needed).
- `vp check` runs format + lint + tsc together — recommended entry for CI.
- The `vite.config.ts` loader path that `vp lint` uses is plain Node ESM (no TS transform). If you need to compose presets across files, keep it inline or build the consumer first.

### With standalone oxlint

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { nextjs, tailwind, test } from '@k35o/oxc-config';

export default defineConfig({
  extends: [nextjs, tailwind],
  options: {
    reportUnusedDisableDirectives: 'error',
  },
  settings: {
    react: { version: '19.0.0' },
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      plugins: [...(test.plugins ?? [])],
      rules: test.rules ?? {},
    },
  ],
});
```

For oxfmt, drop our `fmt` preset into `.oxfmtrc.json` (or use `oxfmt`'s `defineConfig` from a JS config file).

## Layers

```
base ─┬─ typescript ─┬─ react ── nextjs
      │              └─ (stop at typescript for pure TS libs)
      │
      └─ backend

test     (apply via overrides on test globs)
tailwind (compose with react / nextjs via extends)
fmt      (oxfmt preset, independent of lint layers)
```

| Entry                         | Use for                                         |
| ----------------------------- | ----------------------------------------------- |
| `@k35o/oxc-config/base`       | Lowest common denominator (no TS, no React)     |
| `@k35o/oxc-config/typescript` | Pure TypeScript libraries / CLIs                |
| `@k35o/oxc-config/react`      | Any React app or library                        |
| `@k35o/oxc-config/nextjs`     | Next.js App Router                              |
| `@k35o/oxc-config/backend`    | Node, Cloudflare Workers, Hono                  |
| `@k35o/oxc-config/test`       | Vitest test files (use in `overrides`)          |
| `@k35o/oxc-config/tailwind`   | Tailwind CSS v4 (composes with React / Next.js) |
| `@k35o/oxc-config/fmt`        | oxfmt preset (single quotes, sort imports, …)   |

## Design principles

1. **`categories` declared once** — only in `base`. Higher layers add specific rule overrides on top.
2. **`plugins` is replaced, not merged**, by oxlint. Each layer lists every plugin it depends on.
3. **`options.reportUnusedDisableDirectives` is root-only**. Set it on the consumer's config, not on a shared layer.
4. **`options.typeAware: true` from `typescript` onwards**. Install `oxlint-tsgolint` (or use Vite+) to actually run those rules.

## Recipes

- [Next.js App Router](docs/recipes/nextjs-app-router.md)
- [React library](docs/recipes/react-library.md)
- [Cloudflare Workers / Hono](docs/recipes/cloudflare-workers.md)
- [Monorepo](docs/recipes/monorepo.md)
- [Migrating from Biome](docs/migration-from-biome.md)

## Versioning

Pre-1.0 (`0.x`): treat any release as potentially breaking. Rule additions ship as `minor`; rule removals or severity bumps are called out in the changelog.

## License

[MIT](./LICENSE)
