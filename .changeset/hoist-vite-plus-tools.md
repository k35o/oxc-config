---
'@k8o/oxc-config': none
---

Hoist `oxlint`, `oxfmt` and `oxlint-tsgolint` to the root `node_modules` with `publicHoistPattern`. `vp` resolves these binaries with `require.resolve` from `process.cwd()` first, which walks up the directory tree when the project root has no copy of its own. A checkout nested inside another checkout (such as a Claude Code worktree under `.claude/worktrees/`) then picks up the parent's possibly older copy, and `vp lint` / `vp fmt` run a different version from the one the lockfile pins. The root links stop the walk at the project. Dev tooling only.
