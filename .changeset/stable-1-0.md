---
'@k8o/oxc-config': major
---

First stable release. Nothing changes from 0.4.0; the number states what the package now commits to.

- The layers (`base`, `typescript`, `react`, `nextjs`, `backend`, `test`, `tailwind`, `html-nest`, `fmt`) and `TEST_GLOBS` are the public API. Removing one, dropping a Vite+ major or raising the Node floor is a breaking change and gets a new major.
- Rule additions, removals and option changes ship as minor releases, including ones that make a layer stricter. Pin this package and bump it on purpose.
