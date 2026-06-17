---
---

Add `previews/<preset>/vite.config.ts` and `pnpm preview:<preset>` scripts to
view each lint preset's effective rules with vite-plus-inspector. A
`pnpm preview:build` script plus a Preview workflow deploy a self-contained,
per-PR Cloudflare Pages site so each preset's effective rules can be browsed
from the PR. Dev tooling only — not part of the published package, so no
release.
