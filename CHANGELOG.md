# @k8o/oxc-config

## 1.0.0

### Major Changes

- First stable release. Nothing changes from 0.4.0; the number states what the package now commits to.

  - The layers (`base`, `typescript`, `react`, `nextjs`, `backend`, `test`, `tailwind`, `html-nest`, `fmt`) and `TEST_GLOBS` are the public API. Removing one, dropping a Vite+ major or raising the Node floor is a breaking change and gets a new major.
  - Rule additions, removals and option changes ship as minor releases, including ones that make a layer stricter. Pin this package and bump it on purpose.

## 0.4.0

### Minor Changes

- Stop shipping the JSON variants of the presets (`dist/<layer>.oxlintrc.json`, `dist/fmt.oxfmtrc.json`) and their `exports` entries. They existed for `.oxlintrc.json` consumers, who cannot import a package in `extends`. The presets are consumed from `vite.config.ts`, which imports them directly.

- Remove the `playwright` layer, the `PLAYWRIGHT_GLOBS` export and the `eslint-plugin-playwright` peer dependency.

  The layer mirrored the plugin's recommended set, which has to be re-synced on every plugin release, and its globs overlapped `TEST_GLOBS` so that using both layers needed an `excludeFiles` workaround. Projects that lint Playwright specs can list the plugin in `jsPlugins` and spread its `flat/recommended` rules into an override.

- Remove the `regexp` layer, its JSON variant (`dist/regexp.oxlintrc.json`) and the `eslint-plugin-regexp` peer dependency.

  The layer was a copy of the plugin's recommended set: 60 rules to keep in sync, several of which report the same code as oxlint's own regex rules. Projects that run untrusted input through regular expressions can list the plugin in `jsPlugins` and enable `regexp/no-super-linear-backtracking`, which oxlint has no equivalent for.

- Remove the `storybook` layer, the `STORYBOOK_GLOBS` export and the `eslint-plugin-storybook` peer dependency.

  eslint-plugin-storybook 10.6 only partly understands CSF Next (`preview.meta()` / `meta.story()`). `hierarchy-separator` and `no-redundant-story-name` read the default-export meta object, so they report nothing, and `await-interactions` does not recognise imports from `storybook/test`. What still works is import hygiene and export naming, which does not justify a layer. Projects that want the plugin can list it in `jsPlugins` themselves.

- Review every layer against oxlint 1.85: stop reporting the same problem twice, stop rejecting idiomatic code, and pick up rules worth having.

  **One report per problem.** Where two rules flagged the same code, one is now off.

  - `base`: `no-negated-condition`, `no-new-wrappers`, `unicorn/no-instanceof-array`, `unicorn/no-hex-escape`, `promise/no-return-wrap` (their `unicorn/*` counterparts stay on).
  - `typescript`: core `require-await`, `no-throw-literal`, `prefer-promise-reject-errors`, `no-implied-eval`, plus `unicorn/prefer-includes`, `unicorn/prefer-array-find`, `unicorn/no-this-assignment`, `unicorn/no-static-only-class` (the type-aware `typescript/*` rules stay on), and the deprecated `typescript/ban-types` / `typescript/prefer-ts-expect-error`.
  - `react`: the React Compiler rules `react/hooks`, `react/memo-dependencies`, `react/exhaustive-effect-dependencies`, `react/static-components`, `react/no-deriving-state-in-effects` (`rules-of-hooks`, `exhaustive-deps`, `no-unstable-nested-components` and `set-state-in-effect` stay on).

  **Idiomatic code passes.**

  - `base` turns off `no-inline-comments`, `require-unicode-regexp`, `no-underscore-dangle`, `no-promise-executor-return`, `no-await-in-loop`, `no-inner-declarations`, `sort-vars`, `import/no-unassigned-import`, `unicorn/no-array-callback-reference`, `unicorn/explicit-length-check`, `unicorn/prefer-number-coercion`, `unicorn/require-post-message-target-origin`. `eqeqeq` allows `== null`, `prefer-destructuring` only applies to declarations, `unicorn/consistent-function-scoping` ignores arrow functions, and `promise/always-return` ignores the last callback.
  - `typescript` turns off `no-redeclare` (so `const Status` and `type Status` can share a name), `typescript/strict-void-return` and `typescript/consistent-return`. `typescript/strict-boolean-expressions` allows nullable booleans and strings, and `typescript/switch-exhaustiveness-check` accepts a `default` branch.
  - `react` turns off `react/no-unknown-property`, `react/no-unescaped-entities`, `react/jsx-no-target-blank`, `react/capitalized-calls` and `jsx-a11y/prefer-tag-over-role`; downgrades `react/hook-use-state`, `react/iframe-missing-sandbox`, `react/no-object-type-as-default-prop`, `jsx-a11y/no-noninteractive-element-interactions` and the React Compiler rules `react/set-state-in-effect`, `react/refs`, `react/incompatible-library`, `react/preserve-manual-memoization` to warn; and gives `jsx-a11y/control-has-associated-label` and `jsx-a11y/no-noninteractive-element-to-interactive-role` the allow-lists eslint-plugin-jsx-a11y recommends. `typescript/no-misused-promises` no longer checks JSX attributes.
  - `nextjs` downgrades `nextjs/next-script-for-ga` and `nextjs/no-html-link-for-pages` to warn, turns off `nextjs/no-page-custom-font`, and allows `<img>` in metadata image routes (`opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx`).
  - `backend` turns off `unicorn/prefer-event-target`.
  - `test` replaces `vitest/no-importing-vitest-globals` with `vitest/prefer-importing-vitest-globals` and drops `env.vitest`: Vitest's `globals` option is off by default, so test files import `describe` / `test` / `expect`. It also turns off `vitest/require-mock-type-parameters`, `typescript/require-await` and `unicorn/consistent-function-scoping`, downgrades `vitest/warn-todo` and `vitest/no-conditional-in-test` to warn, and removes `vitest/consistent-each-for`, which reports nothing without options.
  - `tailwind` turns off `tailwindcss/prefer-theme-tokens`, whose fix can change the generated CSS.

  **Stricter.**

  - `test` no longer turns off `typescript/no-floating-promises`: an un-awaited assertion passes without checking anything.
  - `typescript/restrict-template-expressions` rejects `any` and nullish values.

  **New rules.**

  - `base`: `no-sequences`, `no-regex-spaces`, `no-proto`, `no-useless-computed-key`, `no-return-assign`, `no-lone-blocks`, `default-case-last`, `default-param-last`, `one-var`, `prefer-arrow-callback`, `prefer-regex-literals`, `prefer-exponentiation-operator`, `import/no-named-default`, `oxc/bad-bitwise-operator`, and `unicorn/` `prefer-response-static-json`, `prefer-negative-index`, `prefer-logical-operator-over-ternary`, `prefer-default-parameters`, `prefer-bigint-literals`, `prefer-keyboard-event-key`, `prefer-classlist-toggle`, `prefer-dom-node-text-content`, `consistent-date-clone`, `consistent-existence-index-check`, `no-useless-collection-argument`, `no-useless-error-capture-stack-trace`, `require-array-join-separator`.
  - `typescript`: `typescript/prefer-return-this-type`, `typescript/prefer-readonly`, `typescript/prefer-for-of`, `typescript/dot-notation`.
  - `react`: `jsx-a11y/anchor-ambiguous-text` (with Japanese phrases), `react/no-clone-element`, `react/no-react-children`, all at warn.
  - `test`: `vitest/no-unneeded-async-expect-function`, `vitest/no-interpolation-in-snapshots`, `vitest/no-mocks-import` at error; `vitest/prefer-comparison-matcher`, `vitest/prefer-to-have-been-called-times`, `vitest/prefer-called-exactly-once-with`, `vitest/prefer-mock-promise-shorthand`, `vitest/prefer-spy-on`, `vitest/prefer-hooks-in-order`, `vitest/no-alias-methods` at warn.
  - `tailwind`: `tailwindcss/prefer-scale-token` is listed as off.

  **Fixes.**

  - Every layer now lists the `oxc` plugin. It was assumed to be always on, but oxlint drops it when the root config sets `plugins`, so spreading a layer silently disabled every `oxc/*` rule.
  - `settings.tailwindcss.entryPoint` is documented as required.

  The print-config snapshots also pick up the React Compiler rules oxlint 1.79 added to the enabled categories, which the previous snapshots had missed.

- Target Vite+ 1.0 and raise the peer dependency floors to the versions it bundles.

  | Peer                 | Before     | After        |
  | -------------------- | ---------- | ------------ |
  | `oxlint`             | `>=1.71.0` | `>=1.85.0`   |
  | `oxfmt`              | `>=0.43.0` | `>=0.70.0`   |
  | `oxlint-tsgolint`    | `>=0.23.0` | `>=7.0.2003` |
  | `oxlint-tailwindcss` | `>=1.3.2`  | `>=1.12.0`   |

  oxlint refuses to load a config that names a rule it does not know, even one set to `off`, so every rule a layer lists pins a minimum version. The presets now name rules introduced in oxlint 1.79 and oxlint-tailwindcss 1.6.

- Depend on Vite+ instead of oxlint and oxfmt.

  - `vite-plus >=1.0.0` is now a peer dependency. The `oxlint`, `oxfmt` and `oxlint-tsgolint` peers are removed.
  - The published types import `OxlintConfig` from `vite-plus/lint` and `OxfmtConfig` from `vite-plus/fmt`.
  - The README no longer documents a standalone oxlint setup.

  Vite+ pins the exact oxlint, oxfmt and tsgolint it ships, so the presets are now developed and tested against that one combination instead of a separately managed oxlint.

### Patch Changes

- `test`: `vitest/valid-title` no longer checks the type of a title. The rule cannot see types, so it rejected every title that was not a literal — `test(name, …)` inside a loop, `describe(someFunction, …)` — even though TypeScript already checks the argument. It still reports empty titles, duplicated prefixes and stray whitespace.

- Stop publishing the `docs/` recipes. They repeated the README's quick start once per stack and went stale with every rule change. What was specific to them — the settings a monorepo has to set per package, and how to override a rule for part of a project — is now in the README, which ships with the package.

## 0.3.0

### Patch Changes

- oxlint 1.77 adds `oxc/bad-match-all-arg` to the `correctness` category and `prefer-promise-reject-errors` to the `pedantic` category. Every preset enables both categories at error, so all of them now deny these two rules. Snapshots updated to match the new effective config.

## 0.3.0

### Minor Changes

- Add the opt-in `html-nest` layer: WHATWG HTML content-model validation for JSX via the `@k8o/html-nest` oxlint plugin (`html-nest/valid-html-nesting`). Compose it with any JSX layer via `extends`; consumers install `@k8o/html-nest` as an optional peer.

  `engines.node` is now `>=24.13.0` (was `^20.19.0 || >=22.12.0`): Node 20 is EOL, CI only exercises Node 24, and the floor now matches `@k8o/html-nest`.

## 0.2.1

### Patch Changes

- oxlint 1.73 adds `unicorn/no-confusing-array-with` to the `suspicious` category, so every preset that enables `suspicious` at error (all of them) now denies this rule. Snapshots updated to match the new effective config.

- Switch release automation from changesets/action to [pnpm-release-action](https://github.com/k35o/pnpm-release-action) (pnpm built-in release management). No runtime changes.

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
