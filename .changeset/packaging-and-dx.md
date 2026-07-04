---
'@k8o/oxc-config': minor
---

Widen who can consume the package and harden the release.

- **Node engines relaxed** from `>=24.13.0` to `^20.19.0 || >=22.12.0`. The
  published output is plain data; the old floor needlessly blocked Node 20/22 LTS
  consumers (and failed `engine-strict` installs).
- **`exports` no longer nests under an `import` condition**, so `require()` works
  on Node ≥ 20.19/22.12 (`require(esm)`) instead of throwing
  `ERR_PACKAGE_PATH_NOT_EXPORTED`. Added top-level `main`/`types` too.
- **Plain-JSON distribution.** The build now emits `dist/<layer>.oxlintrc.json`
  (with `extends` rewritten to sibling JSON paths) and `dist/fmt.oxfmtrc.json`,
  so `.oxlintrc.json` / `.oxfmtrc.json` consumers — who cannot `import` an npm
  package in `extends` — can use the presets via a file path.
- **`oxlint-tsgolint` is now an optional peer dependency**, matching the other
  optional peers; type-aware rules need it for standalone oxlint.
- **`fmt` preset trimmed** to the keys that actually deviate from oxfmt's
  defaults (plus the few that pin against `.editorconfig`); the hardcoded
  `ignorePatterns` is removed (it was silently clobbered when consumers set their
  own, and baked in a changesets-specific assumption).
- **Release safety.** `release` now runs `pnpm check` and `pnpm test` before
  publishing, the CI check job runs `publint` + `attw`, and the CI changeset gate
  no longer exempts Renovate's `oxc-update` PRs — the ones that actually change
  the effective rule set now require a changeset documenting it. The preset
  previews are also deployed to a stable URL on push to `main`.
