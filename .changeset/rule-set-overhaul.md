---
'@k8o/oxc-config': minor
---

Overhaul the lint rule set and require oxlint ≥ 1.71.

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
