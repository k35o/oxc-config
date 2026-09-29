---
'@k8o/oxc-config': minor
---

Depend on Vite+ instead of oxlint and oxfmt.

- `vite-plus >=1.0.0` is now a peer dependency. The `oxlint`, `oxfmt` and `oxlint-tsgolint` peers are removed.
- The published types import `OxlintConfig` from `vite-plus/lint` and `OxfmtConfig` from `vite-plus/fmt`.
- The README no longer documents a standalone oxlint setup.

Vite+ pins the exact oxlint, oxfmt and tsgolint it ships, so the presets are now developed and tested against that one combination instead of a separately managed oxlint.
