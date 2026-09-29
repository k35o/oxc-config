# `@k8o/oxc-config`

Shareable lint and format presets for [Vite+](https://viteplus.dev/), built on the [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://github.com/oxc-project/oxfmt) it bundles. For TypeScript / React / Next.js / Backend / Tailwind / Test projects.

Strict by default. Composable via oxlint's native `extends`.

> **Browse the effective rules of every layer:** <https://oxc-config-preview.pages.dev>

## Install

```bash
pnpm add -D vite-plus @k8o/oxc-config
# Only when you use the matching lint layer:
pnpm add -D oxlint-tailwindcss    # tailwind
pnpm add -D @k8o/html-nest        # html-nest
```

> Requires **Vite+ ≥ 1.0** and Node ≥ 24.13. Vite+ bundles oxlint, oxfmt and
> `oxlint-tsgolint`; don't install them yourself. oxlint fails to build a config
> that names an unknown rule — even one set to `off` — so an older Vite+, which
> bundles an older oxlint, is not supported.

## Quick start

`vp lint` reads the `lint:` field of `vite.config.ts`, and `vp fmt` reads `fmt:`.

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
    },
    settings: {
      react: { version: '19.0.0' },
      tailwindcss: { entryPoint: './src/app/globals.css' },
    },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
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

`vp check` runs format + lint + tsc together, which makes it the entry point for CI.

## Layers

```
base ─┬─ typescript ─┬─ react ── nextjs
      │              └─ (stop at typescript for pure TS libs)
      │
      └─ backend

test       (apply via overrides on test globs)
tailwind   (compose with react / nextjs via extends)
html-nest  (compose with any JSX layer via extends)
fmt        (oxfmt preset, independent of lint layers)
```

| Entry                        | Use for                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| `@k8o/oxc-config/base`       | Lowest common denominator (plain JS)                            |
| `@k8o/oxc-config/typescript` | Pure TypeScript libraries / CLIs                                |
| `@k8o/oxc-config/react`      | Any React app or library                                        |
| `@k8o/oxc-config/nextjs`     | Next.js App Router                                              |
| `@k8o/oxc-config/backend`    | Node, Cloudflare Workers, Hono                                  |
| `@k8o/oxc-config/test`       | Vitest test files (use in `overrides`)                          |
| `@k8o/oxc-config/tailwind`   | Tailwind CSS v4 (composes with React / Next.js)                 |
| `@k8o/oxc-config/html-nest`  | HTML nesting validity in JSX (composes with `react` / `nextjs`) |
| `@k8o/oxc-config/fmt`        | oxfmt preset (single quotes, sort imports, …)                   |

Also exported: `TEST_GLOBS` — the canonical glob array for the `overrides` entry so you don't hand-copy (and drift from) the file matrix.

### Settings the layers rely on

oxlint does not inherit `env` or `settings` through `extends`, so these belong in your own config:

| Layer      | Setting                           | Why                                                                                           |
| ---------- | --------------------------------- | --------------------------------------------------------------------------------------------- |
| `base`     | `env` (`browser`, `node`, …)      | Plain JS only: `no-undef` needs to know the runtime's globals. TypeScript layers turn it off. |
| `react`    | `settings.react.version`          | Version-dependent React rules.                                                                |
| `nextjs`   | `settings.next.rootDir`           | Monorepos only: the app's directory, so the plugin does not look at the repo root.            |
| `tailwind` | `settings.tailwindcss.entryPoint` | Required. Without it the rules that read the design system report a configuration error.      |

In a monorepo, give each package its own config and point these paths at that package.

### Adjusting a layer

Rules in your own config win over the layers in `extends`. Use `rules` for the whole project and `overrides` for part of it:

```ts
export default defineConfig({
  extends: [nextjs],
  // Server code that logs to stdout.
  rules: { 'no-console': 'off' },
  overrides: [
    {
      // PascalCase filenames for components; everything else stays kebab-case.
      files: ['src/components/**/*.tsx'],
      rules: { 'unicorn/filename-case': ['error', { case: 'pascalCase' }] },
    },
  ],
});
```

## Design principles

1. **`categories` declared once** — only in `base`. Higher layers add specific rule overrides on top.
2. **Files are pure deltas.** Each layer lists only rules that differ from the category defaults (an off, a warn, a non-default option, or a cherry-pick). Rules that merely restate a category severity are not repeated — the snapshot suite guards against category drift.
3. **`nursery` is off.** Leaving it at error silently escalates every new upstream nursery rule to an error on each oxlint minor bump. `base` sets `nursery: 'off'` and cherry-picks the handful worth keeping.
4. **`plugins` is replaced, not merged**, by oxlint. `typescript`, `unicorn` and `oxc` are on by default only while no config sets `plugins`, so each layer lists every plugin it depends on. Prefer `extends: [layer]` over spreading a layer into the root config.
5. **`options.reportUnusedDisableDirectives` is root-only**. Set it on the consumer's config, not on a shared layer.
6. **`options.typeAware: true` from `typescript` onwards**, and it carries through `extends`. Vite+ bundles the `oxlint-tsgolint` that runs those rules.

## Type-aware linting

The `typescript` layer and everything above it set `options.typeAware: true`, which turns on [oxlint-tsgolint](https://github.com/oxc-project/tsgolint) (a `typescript-go` / TS7-based type checker). Caveats worth knowing:

- It runs a real type check, so it needs a resolvable `tsconfig.json` and is meaningfully slower / more memory-hungry than the syntactic rules.

## Versioning

Pre-1.0 (`0.x`): treat any release as potentially breaking.

Because the categories are enabled wholesale, **your effective rule set is also a function of the oxlint your Vite+ bundles**, not just this package's version — upgrading Vite+ can surface new rules regardless of whether this package changed. To keep upgrades deliberate:

- Pin `vite-plus` exactly and bump it on purpose.
- New rules this package adds ship as `minor`; rule removals or severity bumps are called out in the changelog.

## License

[MIT](./LICENSE)
