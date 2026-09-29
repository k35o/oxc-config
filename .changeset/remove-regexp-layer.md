---
'@k8o/oxc-config': minor
---

Remove the `regexp` layer, its JSON variant (`dist/regexp.oxlintrc.json`) and the `eslint-plugin-regexp` peer dependency.

The layer was a copy of the plugin's recommended set: 60 rules to keep in sync, several of which report the same code as oxlint's own regex rules. Projects that run untrusted input through regular expressions can list the plugin in `jsPlugins` and enable `regexp/no-super-linear-backtracking`, which oxlint has no equivalent for.
