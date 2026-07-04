# @k8o/oxc-config

## 0.2.0

### Minor Changes

- [#48](https://github.com/k35o/oxc-config/pull/48) [`ea6c01b`](https://github.com/k35o/oxc-config/commit/ea6c01bf75930e9af852224475ad99ea5f886bec) Thanks [@k35o](https://github.com/k35o)! - Add three optional layers and canonical glob exports.

  - **`@k8o/oxc-config/regexp`** — regex safety via `eslint-plugin-regexp`
    (JS plugin). Mirrors the plugin's `recommended` set; the standout is
    `no-super-linear-backtracking`, which catches ReDoS-prone patterns oxlint's
    built-in regex rules miss. Compose it with any layer via `extends`.
  - **`@k8o/oxc-config/playwright`** — Playwright e2e rules via
    `eslint-plugin-playwright`. Apply on e2e globs:
    `overrides: [{ files: [...PLAYWRIGHT_GLOBS], ...playwright }]`.
  - **`@k8o/oxc-config/storybook`** — Storybook story-file rules via
    `eslint-plugin-storybook`. Apply on story globs:
    `overrides: [{ files: [...STORYBOOK_GLOBS], ...storybook }]`. Note the plugin
    imports the `storybook` package at load time, so this layer only loads inside a
    real Storybook project.

  All three plugins are declared as optional peer dependencies.

  Also exported: `TEST_GLOBS`, `STORYBOOK_GLOBS`, and `PLAYWRIGHT_GLOBS` — the
  canonical glob arrays for the `overrides` entries, so consumers stop hand-copying
  (and drifting from) the file matrix. `PLAYWRIGHT_GLOBS` is deliberately disjoint
  from `TEST_GLOBS` so unit-test and e2e files don't both match.

- [#48](https://github.com/k35o/oxc-config/pull/48) [`ea6c01b`](https://github.com/k35o/oxc-config/commit/ea6c01bf75930e9af852224475ad99ea5f886bec) Thanks [@k35o](https://github.com/k35o)! - Widen who can consume the package and harden the release.

  - **Node engines relaxed** from `>=24.13.0` to `^20.19.0 || >=22.12.0`. The
    published output is plain data; the old floor needlessly blocked Node 20/22 LTS
    consumers (and failed `engine-strict` installs).
  - **`exports` no longer nests under an `import` condition**, so `require()` works
    on Node ≥ 20.19/22.12 (`require(esm)`) instead of throwing
    `ERR_PACKAGE_PATH_NOT_EXPORTED`. Added top-level `main`/`types` too.
  - **Plain-JSON distribution.** The build now emits `dist/<layer>.oxlintrc.json`
    (with `extends` rewritten to sibling JSON paths) and `dist/fmt.oxfmtrc.json`,
    so `.oxlintrc.json` / `.oxfmtrc.json` consumers — who cannot `import` an npm
    package in `extends` — can use the presets via a file path.
  - **`oxlint-tsgolint` is now an optional peer dependency**, matching the other
    optional peers; type-aware rules need it for standalone oxlint.
  - **`fmt` preset trimmed** to the keys that actually deviate from oxfmt's
    defaults (plus the few that pin against `.editorconfig`); the hardcoded
    `ignorePatterns` is removed (it was silently clobbered when consumers set their
    own, and baked in a changesets-specific assumption).
  - **Release safety.** `release` now runs `pnpm check` and `pnpm test` before
    publishing, the CI check job runs `publint` + `attw`, and the CI changeset gate
    no longer exempts Renovate's `oxc-update` PRs — the ones that actually change
    the effective rule set now require a changeset documenting it. The preset
    previews are also deployed to a stable URL on push to `main`.

- [#48](https://github.com/k35o/oxc-config/pull/48) [`ea6c01b`](https://github.com/k35o/oxc-config/commit/ea6c01bf75930e9af852224475ad99ea5f886bec) Thanks [@k35o](https://github.com/k35o)! - Overhaul the lint rule set and require oxlint ≥ 1.71.

  **`nursery` is now off.** Leaving the category at error silently escalated every
  new upstream nursery rule to an error on each oxlint minor bump (this is how the
  experimental `react/react-compiler` rule started erroring). `base` now sets
  `nursery: 'off'` and cherry-picks the few worth keeping (`no-undef`,
  `no-useless-assignment`, `promise/no-return-in-finally`,
  `unicorn/no-useless-iterator-to-array`, and — in the TS layers —
  `typescript/prefer-optional-chain` and `typescript/no-unnecessary-condition`).

  **Pure-delta config.** Every layer now lists only rules that differ from the
  category defaults; ~90 declarations that merely restated a category severity were
  removed. Behavior is unchanged for those (the snapshot suite verifies it), but
  the files are far shorter and each entry is a real decision.

  **New rules** (all fit the strict-by-default philosophy; formatting-adjacent
  concerns are left to oxfmt):

  - base: `no-template-curly-in-string`, `no-new-func`, `no-script-url`,
    `no-empty`, `no-alert`, `object-shorthand`, `prefer-object-spread`,
    `prefer-object-has-own`, `prefer-rest-params`, `prefer-spread`,
    `logical-assignment-operators`, `import/first`, `unicorn/error-message`,
    `unicorn/no-abusive-eslint-disable`, `unicorn/no-anonymous-default-export`,
    `unicorn/no-zero-fractions`, `unicorn/prefer-array-index-of`,
    `unicorn/prefer-string-trim-start-end`, `unicorn/prefer-object-from-entries`,
    `unicorn/prefer-structured-clone`, `unicorn/prefer-export-from`.
  - typescript: `method-signature-style`, `no-namespace`, `no-invalid-void-type`,
    `prefer-function-type`, `adjacent-overload-signatures`, `unified-signatures`,
    `prefer-reduce-type-parameter`, `prefer-find`,
    `import/consistent-type-specifier-style`; plus option tuning on
    `no-confusing-void-expression` (ignore arrow shorthand) and
    `no-unnecessary-condition` (allow literal loop guards). `import/default`,
    `import/namespace`, and `import/no-named-as-default-member` are now off (the
    compiler covers them).
  - react: `jsx-pascal-case`, `hook-use-state`, `jsx-fragments`,
    `prefer-function-component`. The `react-perf` plugin is dropped (it was only
    enabled to turn all of its rules off), keeping the React Compiler stance.
  - base: `import/max-dependencies` is now off — it contradicted the "size limits
    are the consumer's business" policy by capping imports at 10.

  **Test layer is Vitest-only.** It previously enabled both the `jest` and
  `vitest` plugins, which double-reported every shared violation and let the
  vitest twin re-escalate rules the config meant to downgrade. It now uses `vitest`
  only, provides the test globals via `env`, and relaxes the `no-unsafe-*` family
  and `unbound-method` (which fire on idiomatic mocks / `expect(obj.method)`).
  Apply it by spreading over `TEST_GLOBS`:
  `overrides: [{ files: [...TEST_GLOBS], ...test }]`.

  **Tailwind:** `no-unknown-classes` is re-enabled at warn (the flakiness was fixed
  upstream in oxlint-tailwindcss 1.3.1/1.3.2), and the previously-missing
  `prefer-theme-tokens` is now decided explicitly.

  BREAKING: the `oxlint` peer floor is raised to `>=1.71.0` (the config references
  rules that only exist in recent oxlint, and oxlint fails to build a config with
  an unknown rule) and `oxlint-tailwindcss` to `>=1.3.2`.

## 0.1.3

### Patch Changes

- [#12](https://github.com/k35o/oxc-config/pull/12) [`ad0ec98`](https://github.com/k35o/oxc-config/commit/ad0ec987ee536d7c89f0e89e115882e3f1551ebd) Thanks [@renovate](https://github.com/apps/renovate)! - Bump oxc toolchain: `oxlint`/`@oxlint/plugins` 1.58.0 → 1.63.0, `oxfmt` 0.43.0 → 0.48.0, `oxlint-tailwindcss` 0.6.1 → 0.7.0. Also bump `vite-plus` 0.1.16 → 0.1.21 since `oxfmt` ≥ 0.44.0 restricted its package `exports` and older `vite-plus` could no longer resolve the `oxfmt` binary.

- [#18](https://github.com/k35o/oxc-config/pull/18) [`b2e48cc`](https://github.com/k35o/oxc-config/commit/b2e48cc0586f0b3a2ba5998f94a24d20d565744a) Thanks [@renovate](https://github.com/apps/renovate)! - Bump oxc toolchain: `oxlint`/`@oxlint/plugins` 1.63.0 → 1.66.0, `oxfmt` 0.48.0 → 0.51.0, `oxlint-tailwindcss` 0.7.0 → 0.8.0. New rules now enabled via existing category settings: `no-implied-eval`, `react/no-object-type-as-default-prop`, `react/no-unstable-nested-components`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`.

## 0.1.2

### Patch Changes

- [#5](https://github.com/k35o/oxc-config/pull/5) [`784893a`](https://github.com/k35o/oxc-config/commit/784893a286890e7a21199a8778eaf5de4147ad72) Thanks [@k35o](https://github.com/k35o)! - Adopt three real-world overrides as defaults so consumers do not have to repeat them:

  - `react/only-export-components`: off (compound components like `export const Foo = { Root, Item } as const` are common). The `nextjs.ts` override that re-enabled it for framework files is removed as no longer relevant.
  - `typescript/no-unsafe-type-assertion`: off (CSS custom properties, `JSON.parse` results, and synthetic event refinements legitimately need `as`).
  - `import/no-unassigned-import`: allow `**/*.{css,scss,sass,less}` so stylesheet side-effect imports do not fire.

## 0.1.1

### Patch Changes

- [#2](https://github.com/k35o/oxc-config/pull/2) [`5dfe683`](https://github.com/k35o/oxc-config/commit/5dfe6830c8f7075412d706882208429a52071c6d) Thanks [@k35o](https://github.com/k35o)! - Loosen several rules based on real-world feedback:

  - `react/react-in-jsx-scope`: off (React 17+ JSX transform makes it unnecessary).
  - `react-perf/*`: off (React Compiler / manual `useMemo`-`useCallback` cover this).
  - `tailwindcss/no-unknown-classes`: off (was flaky).
  - `tailwindcss/enforce-sort-order`: off (oxfmt's `sortTailwindcss: true` already orders classes).
  - `import/no-default-export`: off in `base` (Storybook stories, Next.js pages, and many tooling configs require default exports). The `nextjs` and `backend` overrides that re-disabled it are removed as redundant.
