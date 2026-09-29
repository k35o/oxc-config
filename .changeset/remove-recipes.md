---
'@k8o/oxc-config': patch
---

Stop publishing the `docs/` recipes. They repeated the README's quick start once per stack and went stale with every rule change. What was specific to them — the settings a monorepo has to set per package, and how to override a rule for part of a project — is now in the README, which ships with the package.
