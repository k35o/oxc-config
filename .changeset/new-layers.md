---
'@k8o/oxc-config': minor
---

Add three optional layers and canonical glob exports.

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
