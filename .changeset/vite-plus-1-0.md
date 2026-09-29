---
'@k8o/oxc-config': minor
---

Target Vite+ 1.0 and raise the peer dependency floors to the versions it bundles.

| Peer                       | Before     | After        |
| -------------------------- | ---------- | ------------ |
| `oxlint`                   | `>=1.71.0` | `>=1.85.0`   |
| `oxfmt`                    | `>=0.43.0` | `>=0.70.0`   |
| `oxlint-tsgolint`          | `>=0.23.0` | `>=7.0.2003` |
| `eslint-plugin-playwright` | `>=2.0.0`  | `>=2.12.0`   |
| `oxlint-tailwindcss`       | `>=1.3.2`  | `>=1.12.0`   |

oxlint refuses to load a config that names a rule it does not know, even one set to `off`, so every rule a layer lists pins a minimum version. The previous floors were already too low for the rules the `playwright` layer listed, and the presets now name rules introduced in oxlint 1.79.
