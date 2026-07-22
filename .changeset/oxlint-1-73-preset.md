---
'@k8o/oxc-config': patch
---

oxlint 1.73 adds `unicorn/no-confusing-array-with` to the `suspicious` category, so every preset that enables `suspicious` at error (all of them) now denies this rule. Snapshots updated to match the new effective config.
