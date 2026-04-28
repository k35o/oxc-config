# @k8o/oxc-config

## 0.1.1

### Patch Changes

- [#2](https://github.com/k35o/oxc-config/pull/2) [`5dfe683`](https://github.com/k35o/oxc-config/commit/5dfe6830c8f7075412d706882208429a52071c6d) Thanks [@k35o](https://github.com/k35o)! - Loosen several rules based on real-world feedback:

  - `react/react-in-jsx-scope`: off (React 17+ JSX transform makes it unnecessary).
  - `react-perf/*`: off (React Compiler / manual `useMemo`-`useCallback` cover this).
  - `tailwindcss/no-unknown-classes`: off (was flaky).
  - `tailwindcss/enforce-sort-order`: off (oxfmt's `sortTailwindcss: true` already orders classes).
  - `import/no-default-export`: off in `base` (Storybook stories, Next.js pages, and many tooling configs require default exports). The `nextjs` and `backend` overrides that re-disabled it are removed as redundant.
