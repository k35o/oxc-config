# Migrating from Biome

Biome bundles a formatter and linter behind one binary and one `biome.json`.
This config splits the same job across the oxc toolchain: **oxlint** for linting
(with `oxlint-tsgolint` for type-aware rules) and **oxfmt** for formatting. The
mapping is mostly mechanical.

## What maps to what

| Biome                                               | Here                                               |
| --------------------------------------------------- | -------------------------------------------------- |
| `biome.json` › `linter`                             | `oxlint.config.ts` (`extends: [...]` a layer)      |
| `biome.json` › `formatter` / `javascript.formatter` | the `fmt` preset (oxfmt)                           |
| `biome lint`                                        | `oxlint` (or `vp lint`)                            |
| `biome format --write`                              | `oxfmt` (or `vp fmt`)                              |
| `biome check --write`                               | `vp check --fix` (fmt + lint + tsc)                |
| `organizeImports`                                   | `fmt`'s `sortImports: true`                        |
| rule groups (`a11y`, `suspicious`, …)               | oxlint categories (`correctness`, `suspicious`, …) |

## Steps

1. **Remove Biome**, add the toolchain:

   ```bash
   pnpm remove @biomejs/biome
   pnpm add -D vite-plus @k8o/oxc-config          # Vite+ route (bundles oxlint/oxfmt/tsgolint)
   # or, standalone:
   pnpm add -D oxlint oxfmt oxlint-tsgolint @k8o/oxc-config
   ```

2. **Replace `biome.json`** with an `oxlint.config.ts` (or the `lint:` field of
   `vite.config.ts`) that extends the layer matching your stack — see the
   [Next.js](./recipes/nextjs-app-router.md), [React library](./recipes/react-library.md),
   or [Cloudflare Workers](./recipes/cloudflare-workers.md) recipes. Drop the
   `fmt` preset in for formatting.

3. **Port your rule overrides.** Biome rule names differ from oxlint's, but the
   intent usually has a direct equivalent (e.g. Biome
   `noExplicitAny` → `typescript/no-explicit-any`, `useConst` → `prefer-const`).
   Most Biome-recommended rules are already covered by the categories here, so
   start with an empty overrides block and only add what you actually relied on.

4. **Move `files.ignore` / `formatter.ignore`** to your Vite+ config's
   `ignorePatterns` (the shared `fmt` preset deliberately ships no
   `ignorePatterns`, so repo-specific ignores live in your config, not the
   preset).

## Behavioral differences to expect

- **Type-aware rules.** Biome's linter is syntax-only; this config runs
  `oxlint-tsgolint`, so rules like `no-floating-promises` and
  `no-misused-promises` will flag real bugs Biome never saw. Expect a first-run
  batch of findings. Each package needs a resolvable `tsconfig.json`.
- **Formatting defaults.** oxfmt defaults to single quotes and an 80-column
  width in this preset (Biome defaults to double quotes / 80). Run
  `vp fmt` (or `oxfmt`) once to reformat the tree in a single commit before you
  start linting, so lint diffs stay readable.
- **Import sorting** is part of formatting (`sortImports`), the same as Biome's
  `organizeImports`, so it runs on `vp fmt` — no separate step.
- **Strictness.** `nursery` is off but `pedantic` is on at error, and many
  `unicorn`/`typescript` rules are cherry-picked on top. This is stricter than
  Biome's recommended set; loosen individual rules in `overrides` rather than
  dropping a whole category.

## Editor

Point your editor at the oxlint LSP (the `oxc` VS Code extension) instead of the
Biome extension. Format-on-save should call oxfmt.
