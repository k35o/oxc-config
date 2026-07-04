# `@k8o/oxc-config`

Shareable [oxlint](https://oxc.rs/docs/guide/usage/linter) + [oxfmt](https://github.com/oxc-project/oxfmt) configurations for TypeScript / React / Next.js / Backend / Tailwind / Test projects.

Strict by default. Composable via oxlint's native `extends`.

> **Browse the effective rules of every layer:** <https://oxc-config-preview.pages.dev>

## Install

### With [Vite+](https://viteplus.dev/) (`vite-plus`)

Vite+ bundles oxlint, oxfmt, and `oxlint-tsgolint`, so you only need to add this config (and any JS plugins you use):

```bash
pnpm add -D vite-plus @k8o/oxc-config
# Only when you use the matching lint layer:
pnpm add -D oxlint-tailwindcss    # tailwind
pnpm add -D eslint-plugin-regexp  # regexp
```

### With standalone oxlint / oxfmt

```bash
pnpm add -D oxlint @k8o/oxc-config
# Add only what you actually use:
pnpm add -D oxfmt                   # if you use the `fmt` preset
pnpm add -D oxlint-tsgolint         # type-aware rules (typescript / react / nextjs / backend)
pnpm add -D oxlint-tailwindcss      # the `tailwind` layer
pnpm add -D eslint-plugin-regexp    # the `regexp` layer
pnpm add -D eslint-plugin-playwright # the `playwright` layer
pnpm add -D eslint-plugin-storybook storybook # the `storybook` layer
```

> Requires **oxlint ≥ 1.71**. The config enables rules that only exist in recent
> oxlint, and oxlint fails to build a config that references an unknown rule, so
> older versions are not supported. Node ≥ 20.19 (or ≥ 22.12).

## Quick start

### With Vite+

`vp lint` reads the `lint:` field of `vite.config.ts`, and `vp fmt` reads `fmt:`. Both accept the same shape as a standalone `oxlint.config.ts` / `.oxfmtrc.json`. Spread our presets in:

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

- Don't install `oxlint`, `oxfmt`, or `oxlint-tsgolint` directly — Vite+ wraps them. JS plugins (`oxlint-tailwindcss`, `eslint-plugin-regexp`, …) stay separate installs.
- Type-aware rules work out of the box (no separate `oxlint-tsgolint` install needed).
- `vp check` runs format + lint + tsc together — recommended entry for CI.
- The `vite.config.ts` loader path that `vp lint` uses is plain Node ESM (no TS transform). If you need to compose presets across files, keep it inline or build the consumer first.

### With standalone oxlint

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { nextjs, tailwind, test, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  extends: [nextjs, tailwind],
  options: {
    reportUnusedDisableDirectives: 'error',
  },
  settings: {
    react: { version: '19.0.0' },
  },
  overrides: [{ files: [...TEST_GLOBS], ...test }],
});
```

For oxfmt, drop our `fmt` preset into a JS config, or use the generated JSON (below).

### With a plain `.oxlintrc.json` / `.oxfmtrc.json`

`.oxlintrc.json`'s `extends` takes **file paths, not npm specifiers** ([oxc#14413](https://github.com/oxc-project/oxc/issues/14413)), so JSON consumers cannot `import` this package. We ship a generated JSON variant of each root lint layer (and the fmt preset) for exactly this case:

```jsonc
// .oxlintrc.json
{
  "extends": ["./node_modules/@k8o/oxc-config/dist/nextjs.oxlintrc.json"],
}
```

```jsonc
// .oxfmtrc.json — copy the generated preset, or reference the file in a JS config
// (dist/fmt.oxfmtrc.json)
```

Available JSON layers: `base`, `typescript`, `react`, `nextjs`, `backend`, `tailwind`, `regexp` (as `dist/<layer>.oxlintrc.json`), plus `dist/fmt.oxfmtrc.json`. The override-style layers (`test`, `storybook`, `playwright`) are applied via `overrides`, so JSON consumers copy their rule blocks into an `overrides` entry by hand.

## Layers

```
base ─┬─ typescript ─┬─ react ── nextjs
      │              └─ (stop at typescript for pure TS libs)
      │
      └─ backend

test       (apply via overrides on test globs)
tailwind   (compose with react / nextjs via extends)
regexp     (compose with any layer via extends)
storybook  (apply via overrides on story globs)
playwright (apply via overrides on e2e globs)
fmt        (oxfmt preset, independent of lint layers)
```

| Entry                        | Use for                                         |
| ---------------------------- | ----------------------------------------------- |
| `@k8o/oxc-config/base`       | Lowest common denominator (plain JS)            |
| `@k8o/oxc-config/typescript` | Pure TypeScript libraries / CLIs                |
| `@k8o/oxc-config/react`      | Any React app or library                        |
| `@k8o/oxc-config/nextjs`     | Next.js App Router                              |
| `@k8o/oxc-config/backend`    | Node, Cloudflare Workers, Hono                  |
| `@k8o/oxc-config/test`       | Vitest test files (use in `overrides`)          |
| `@k8o/oxc-config/tailwind`   | Tailwind CSS v4 (composes with React / Next.js) |
| `@k8o/oxc-config/regexp`     | Regex safety / ReDoS (composes with any layer)  |
| `@k8o/oxc-config/storybook`  | Storybook story files (use in `overrides`)      |
| `@k8o/oxc-config/playwright` | Playwright e2e specs (use in `overrides`)       |
| `@k8o/oxc-config/fmt`        | oxfmt preset (single quotes, sort imports, …)   |

Also exported: `TEST_GLOBS`, `STORYBOOK_GLOBS`, `PLAYWRIGHT_GLOBS` — canonical glob arrays for the `overrides` entries so you don't hand-copy (and drift from) the file matrix.

## Design principles

1. **`categories` declared once** — only in `base`. Higher layers add specific rule overrides on top.
2. **Files are pure deltas.** Each layer lists only rules that differ from the category defaults (an off, a warn, a non-default option, or a cherry-pick). Rules that merely restate a category severity are not repeated — the snapshot suite guards against category drift.
3. **`nursery` is off.** Leaving it at error silently escalates every new upstream nursery rule to an error on each oxlint minor bump. `base` sets `nursery: 'off'` and cherry-picks the handful worth keeping.
4. **`plugins` is replaced, not merged**, by oxlint. Each layer lists every opt-in plugin it depends on (oxlint force-enables `eslint`/`typescript`/`oxc`/`unicorn`, so those are not listed).
5. **`options.reportUnusedDisableDirectives` is root-only**. Set it on the consumer's config, not on a shared layer.
6. **`options.typeAware: true` from `typescript` onwards**. Install `oxlint-tsgolint` (or use Vite+) to actually run those rules.

## Type-aware linting

The `typescript` layer and everything above it set `options.typeAware: true`, which turns on [oxlint-tsgolint](https://github.com/oxc-project/tsgolint) (a `typescript-go` / TS7-based type checker). Caveats worth knowing:

- **Standalone oxlint users must install `oxlint-tsgolint`** (it is an optional peer). Vite+ bundles it.
- It runs a real type check, so it needs a resolvable `tsconfig.json` and is meaningfully slower / more memory-hungry than the syntactic rules.
- Its version is loosely coupled to oxlint's; when you bump oxlint, bump `oxlint-tsgolint` in lockstep.

## Recipes

- [Next.js App Router](docs/recipes/nextjs-app-router.md)
- [React library](docs/recipes/react-library.md)
- [Cloudflare Workers / Hono](docs/recipes/cloudflare-workers.md)
- [Monorepo](docs/recipes/monorepo.md)
- [Migrating from Biome](docs/migration-from-biome.md)

## Versioning

Pre-1.0 (`0.x`): treat any release as potentially breaking.

Because the categories are enabled wholesale, **your effective rule set is also a function of the oxlint version _you_ install**, not just this package's version — upgrading your oxlint can surface new rules regardless of whether this package changed. To keep upgrades deliberate:

- Pin `oxlint` / `oxfmt` exactly and bump them on purpose.
- New rules this package adds ship as `minor`; rule removals or severity bumps are called out in the changelog.

## License

[MIT](./LICENSE)
