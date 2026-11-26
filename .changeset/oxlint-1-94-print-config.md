---
'@k8o/oxc-config': none
---

Update the print-config snapshots for oxlint 1.94 (bundled with vite-plus 1.7.0), whose `--print-config` now prints each rule's configured options and the enabled categories instead of the severity alone. Every rule keeps its name, severity and options, so the published configs do not change.
