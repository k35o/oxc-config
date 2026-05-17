---
'@k8o/oxc-config': patch
---

Bump oxc toolchain: `oxlint`/`@oxlint/plugins` 1.58.0 → 1.63.0, `oxfmt` 0.43.0 → 0.48.0, `oxlint-tailwindcss` 0.6.1 → 0.7.0. Also bump `vite-plus` 0.1.16 → 0.1.21 since `oxfmt` ≥ 0.44.0 restricted its package `exports` and older `vite-plus` could no longer resolve the `oxfmt` binary.
