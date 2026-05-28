---
---

Internal: skip the Changeset CI check on the `changeset-release/main` PR opened by changesets/action. The Version Packages PR consumes existing changesets and bumps `package.json`, so `changeset status` always reports "no changesets but packages changed" and fails CI. No published behavior change.
