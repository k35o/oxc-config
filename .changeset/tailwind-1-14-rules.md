---
'@k8o/oxc-config': minor
---

`tailwind` decides the three rules oxlint-tailwindcss 1.14 adds, and raises the `oxlint-tailwindcss` peer floor to `>=1.14.0`: oxlint rejects a config that names a rule the plugin does not have, even at `off`.

- `tailwindcss/no-dynamic-classes` at error. A class built at runtime (`bg-${color}-500`, `"text-" + tone`) is never written out in full, so Tailwind generates no CSS for it and the element goes unstyled. Write out every class the value can map to; a project that safelists such classes with `@source inline(…)` can disable the rule for those files.
- `tailwindcss/no-default-palette` is listed as off. Once the theme declares a single color of its own, it reports every default-palette class (`bg-white`, `text-gray-500`, `text-red-600`); which palette colors a project keeps is its `allow` list.
- `tailwindcss/no-borrowed-component-styles` is listed as off. It is experimental, and reports nothing without a project-specific `components` list.
