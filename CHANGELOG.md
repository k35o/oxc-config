# @k8o/oxc-config

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
