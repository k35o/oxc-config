---
'@k8o/oxc-config': minor
---

Remove the `storybook` layer, the `STORYBOOK_GLOBS` export and the `eslint-plugin-storybook` peer dependency.

eslint-plugin-storybook 10.6 only partly understands CSF Next (`preview.meta()` / `meta.story()`). `hierarchy-separator` and `no-redundant-story-name` read the default-export meta object, so they report nothing, and `await-interactions` does not recognise imports from `storybook/test`. What still works is import hygiene and export naming, which does not justify a layer. Projects that want the plugin can list it in `jsPlugins` themselves.
