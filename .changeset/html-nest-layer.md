---
'@k8o/oxc-config': minor
---

Add the opt-in `html-nest` layer: WHATWG HTML content-model validation for JSX via the `@k8o/html-nest` oxlint plugin (`html-nest/valid-html-nesting`). Compose it with any JSX layer via `extends`; consumers install `@k8o/html-nest` as an optional peer.

`engines.node` is now `>=24.13.0` (was `^20.19.0 || >=22.12.0`): Node 20 is EOL, CI only exercises Node 24, and the floor now matches `@k8o/html-nest`.
