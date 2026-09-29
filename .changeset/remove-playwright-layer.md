---
'@k8o/oxc-config': minor
---

Remove the `playwright` layer, the `PLAYWRIGHT_GLOBS` export and the `eslint-plugin-playwright` peer dependency.

The layer mirrored the plugin's recommended set, which has to be re-synced on every plugin release, and its globs overlapped `TEST_GLOBS` so that using both layers needed an `excludeFiles` workaround. Projects that lint Playwright specs can list the plugin in `jsPlugins` and spread its `flat/recommended` rules into an override.
