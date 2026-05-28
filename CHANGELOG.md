# @k8o/oxc-config

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
