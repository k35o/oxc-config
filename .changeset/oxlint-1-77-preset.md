---
'@k8o/oxc-config': patch
---

oxlint 1.77 adds `oxc/bad-match-all-arg` to the `correctness` category and `prefer-promise-reject-errors` to the `pedantic` category. Every preset enables both categories at error, so all of them now deny these two rules. Snapshots updated to match the new effective config.
