---
'@k8o/oxc-config': minor
---

Review every layer against oxlint 1.85: stop reporting the same problem twice, stop rejecting idiomatic code, and pick up rules worth having.

**One report per problem.** Where two rules flagged the same code, one is now off.

- `base`: `no-negated-condition`, `no-new-wrappers`, `unicorn/no-instanceof-array`, `unicorn/no-hex-escape`, `promise/no-return-wrap` (their `unicorn/*` counterparts stay on).
- `typescript`: core `require-await`, `no-throw-literal`, `prefer-promise-reject-errors`, `no-implied-eval`, plus `unicorn/prefer-includes`, `unicorn/prefer-array-find`, `unicorn/no-this-assignment`, `unicorn/no-static-only-class` (the type-aware `typescript/*` rules stay on), and the deprecated `typescript/ban-types` / `typescript/prefer-ts-expect-error`.
- `react`: the React Compiler rules `react/hooks`, `react/memo-dependencies`, `react/exhaustive-effect-dependencies`, `react/static-components`, `react/no-deriving-state-in-effects` (`rules-of-hooks`, `exhaustive-deps`, `no-unstable-nested-components` and `set-state-in-effect` stay on).
- `regexp`: core `no-invalid-regexp`, `no-useless-backreference`, `no-empty-character-class`.

**Idiomatic code passes.**

- `base` turns off `no-inline-comments`, `require-unicode-regexp`, `no-underscore-dangle`, `no-promise-executor-return`, `no-await-in-loop`, `no-inner-declarations`, `sort-vars`, `import/no-unassigned-import`, `unicorn/no-array-callback-reference`, `unicorn/explicit-length-check`, `unicorn/prefer-number-coercion`, `unicorn/require-post-message-target-origin`. `eqeqeq` allows `== null`, `prefer-destructuring` only applies to declarations, `unicorn/consistent-function-scoping` ignores arrow functions, and `promise/always-return` ignores the last callback.
- `typescript` turns off `no-redeclare` (so `const Status` and `type Status` can share a name), `typescript/strict-void-return` and `typescript/consistent-return`. `typescript/strict-boolean-expressions` allows nullable booleans and strings, and `typescript/switch-exhaustiveness-check` accepts a `default` branch.
- `react` turns off `react/no-unknown-property`, `react/no-unescaped-entities`, `react/jsx-no-target-blank`, `react/capitalized-calls` and `jsx-a11y/prefer-tag-over-role`; downgrades `react/hook-use-state`, `react/iframe-missing-sandbox`, `react/no-object-type-as-default-prop`, `jsx-a11y/no-noninteractive-element-interactions` and the React Compiler rules `react/set-state-in-effect`, `react/refs`, `react/incompatible-library`, `react/preserve-manual-memoization` to warn; and gives `jsx-a11y/control-has-associated-label` and `jsx-a11y/no-noninteractive-element-to-interactive-role` the allow-lists eslint-plugin-jsx-a11y recommends. `typescript/no-misused-promises` no longer checks JSX attributes.
- `nextjs` downgrades `nextjs/next-script-for-ga` and `nextjs/no-html-link-for-pages` to warn, turns off `nextjs/no-page-custom-font`, and allows `<img>` in metadata image routes (`opengraph-image.tsx`, `twitter-image.tsx`, `icon.tsx`, `apple-icon.tsx`).
- `backend` turns off `unicorn/prefer-event-target`.
- `test` replaces `vitest/no-importing-vitest-globals` with `vitest/prefer-importing-vitest-globals` and drops `env.vitest`: Vitest's `globals` option is off by default, so test files import `describe` / `test` / `expect`. It also turns off `vitest/require-mock-type-parameters`, `typescript/require-await` and `unicorn/consistent-function-scoping`, downgrades `vitest/warn-todo` and `vitest/no-conditional-in-test` to warn, and removes `vitest/consistent-each-for`, which reports nothing without options.
- `playwright` turns off core `no-empty-pattern` for `async ({}, use) => {}` fixtures.
- `tailwind` turns off `tailwindcss/prefer-theme-tokens`, whose fix can change the generated CSS.

**Stricter.**

- `test` no longer turns off `typescript/no-floating-promises`: an un-awaited assertion passes without checking anything.
- `typescript/restrict-template-expressions` rejects `any` and nullish values.

**New rules.**

- `base`: `no-sequences`, `no-regex-spaces`, `no-proto`, `no-useless-computed-key`, `no-return-assign`, `no-lone-blocks`, `default-case-last`, `default-param-last`, `one-var`, `prefer-arrow-callback`, `prefer-regex-literals`, `prefer-exponentiation-operator`, `import/no-named-default`, `oxc/bad-bitwise-operator`, and `unicorn/` `prefer-response-static-json`, `prefer-negative-index`, `prefer-logical-operator-over-ternary`, `prefer-default-parameters`, `prefer-bigint-literals`, `prefer-keyboard-event-key`, `prefer-classlist-toggle`, `prefer-dom-node-text-content`, `consistent-date-clone`, `consistent-existence-index-check`, `no-useless-collection-argument`, `no-useless-error-capture-stack-trace`, `require-array-join-separator`.
- `typescript`: `typescript/prefer-return-this-type`, `typescript/prefer-readonly`, `typescript/prefer-for-of`, `typescript/dot-notation`.
- `react`: `jsx-a11y/anchor-ambiguous-text` (with Japanese phrases), `react/no-clone-element`, `react/no-react-children`, all at warn.
- `test`: `vitest/no-unneeded-async-expect-function`, `vitest/no-interpolation-in-snapshots`, `vitest/no-mocks-import` at error; `vitest/prefer-comparison-matcher`, `vitest/prefer-to-have-been-called-times`, `vitest/prefer-called-exactly-once-with`, `vitest/prefer-mock-promise-shorthand`, `vitest/prefer-spy-on`, `vitest/prefer-hooks-in-order`, `vitest/no-alias-methods` at warn.
- `playwright`: `playwright/no-unnecessary-assertions` (error) and `playwright/no-identical-title` (warn), both from the plugin's recommended set.
- `tailwind`: `tailwindcss/prefer-scale-token` is listed as off.

**Fixes.**

- Every layer now lists the `oxc` plugin. It was assumed to be always on, but oxlint drops it when the root config sets `plugins`, so spreading a layer silently disabled every `oxc/*` rule.
- `PLAYWRIGHT_GLOBS` overlaps `TEST_GLOBS` under `e2e/`; the README now shows how to exclude e2e files from the Vitest override.
- `settings.tailwindcss.entryPoint` is documented as required.

The print-config snapshots also pick up the React Compiler rules oxlint 1.79 added to the enabled categories, which the previous snapshots had missed.
