import type { OxlintConfig } from 'oxlint';

/**
 * WHATWG HTML content-model validation for JSX via the `@k8o/html-nest`
 * oxlint plugin.
 *
 * Optional and composable: list it in `extends` alongside any JSX-capable
 * layer (`extends: [react, htmlNest]`). Consumers install `@k8o/html-nest`
 * as a peer. The single rule flags parent-child pairs the HTML spec forbids
 * (`<div>` inside `<p>`, `<button>` inside `<button>`, …) — the browser
 * parser silently rewrites these, so React hydration breaks before any
 * runtime error points at the cause.
 *
 * Note: `jsPlugins` is still marked alpha upstream and is not inherited
 * through `extends` in some oxlint versions — verify with a smoke lint after
 * wiring.
 */
export const htmlNest: OxlintConfig = {
  jsPlugins: ['@k8o/html-nest/oxlint'],
  rules: {
    'html-nest/valid-html-nesting': 'error',
  },
};
