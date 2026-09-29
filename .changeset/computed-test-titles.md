---
'@k8o/oxc-config': patch
---

`test`: `vitest/valid-title` no longer checks the type of a title. The rule cannot see types, so it rejected every title that was not a literal — `test(name, …)` inside a loop, `describe(someFunction, …)` — even though TypeScript already checks the argument. It still reports empty titles, duplicated prefixes and stray whitespace.
