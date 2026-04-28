---
'@k8o/oxc-config': patch
---

Loosen several rules based on real-world feedback:

- `react/react-in-jsx-scope`: off (React 17+ JSX transform makes it unnecessary).
- `react-perf/*`: off (React Compiler / manual `useMemo`-`useCallback` cover this).
- `tailwindcss/no-unknown-classes`: off (was flaky).
- `tailwindcss/enforce-sort-order`: off (oxfmt's `sortTailwindcss: true` already orders classes).
- `import/no-default-export`: off in `base` (Storybook stories, Next.js pages, and many tooling configs require default exports). The `nextjs` and `backend` overrides that re-disabled it are removed as redundant.
