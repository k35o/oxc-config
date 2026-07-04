# Recipe: React library

For a React component library (published to npm, no Next.js), stop at the
`react` layer. It extends `typescript` → `base` and adds the React / hooks /
`jsx-a11y` rules without any Next.js-specific checks.

## Vite+

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus';
import { fmt, react, test, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  fmt,
  lint: {
    extends: [react],
    options: {
      reportUnusedDisableDirectives: 'error',
      typeAware: true,
    },
    settings: {
      react: { version: '19.0.0' },
    },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
  },
});
```

Add `tailwind` to `extends` if the library ships Tailwind styles, and `regexp`
if it does non-trivial string parsing.

## Library-specific notes

- **Default exports.** `import/no-default-export` stays off, but
  `unicorn/no-anonymous-default-export` is on — a library's default export must
  be named so it shows up in consumers' stack traces.
- **`react/prefer-function-component`** is on. Class components are only allowed
  for error boundaries (the rule's `allowErrorBoundary` default).
- **Public API types.** `typescript/consistent-type-definitions` prefers `type`
  aliases. If your public API deliberately uses `interface` for declaration
  merging, override it for your entry file:

  ```ts
  overrides: [
    {
      files: ['src/index.ts'],
      rules: { 'typescript/consistent-type-definitions': 'off' },
    },
  ],
  ```

- **`react-perf/*` is not enabled.** The config assumes the React Compiler (or
  deliberate `useMemo`/`useCallback`) handles referential-equality concerns, so
  it does not warn on inline objects/functions as props.

## Bundling and `package.json`

The `fmt` preset sorts `package.json` keys and imports. Pair it with
[`publint`](https://publint.dev/) and
[`@arethetypeswrong/cli`](https://github.com/arethetypeswrong/arethetypeswrong.github.io)
in CI to catch broken `exports` / types — lint does not check those.
