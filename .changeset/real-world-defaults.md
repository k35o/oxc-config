---
'@k8o/oxc-config': patch
---

Adopt three real-world overrides as defaults so consumers do not have to repeat them:

- `react/only-export-components`: off (compound components like `export const Foo = { Root, Item } as const` are common). The `nextjs.ts` override that re-enabled it for framework files is removed as no longer relevant.
- `typescript/no-unsafe-type-assertion`: off (CSS custom properties, `JSON.parse` results, and synthetic event refinements legitimately need `as`).
- `import/no-unassigned-import`: allow `**/*.{css,scss,sass,less}` so stylesheet side-effect imports do not fire.
