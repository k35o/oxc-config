---
'@k8o/oxc-config': minor
---

Stop shipping the JSON variants of the presets (`dist/<layer>.oxlintrc.json`, `dist/fmt.oxfmtrc.json`) and their `exports` entries. They existed for `.oxlintrc.json` consumers, who cannot import a package in `extends`. The presets are consumed from `vite.config.ts`, which imports them directly.
