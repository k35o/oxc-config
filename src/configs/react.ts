import type { OxlintConfig } from 'oxlint';

import { REACT_PLUGINS } from '../_shared.js';
import { typescript } from './typescript.js';

/**
 * React config for any React project (libraries, SPAs).
 * Consumer should set `settings.react.version` to match their installed React.
 *
 * Note: `react-hooks` rules live under the `react/` namespace in oxlint
 * (the plugin is bundled into `react`). Only deltas from the categories are
 * listed; the many `react/*` and `jsx-a11y/*` correctness rules that the
 * categories already enable are not repeated.
 */
export const react: OxlintConfig = {
  extends: [typescript],
  plugins: [...REACT_PLUGINS],
  rules: {
    // `jsx-a11y/*` rules are not in an on-by-default category, so each one is
    // enabled explicitly here.
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/media-has-caption': 'warn',
    'jsx-a11y/mouse-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-tabindex': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',

    // `react/*` rules the categories leave off (or that we downgrade).
    'react/no-danger': 'warn',
    'react/no-unknown-property': 'error',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    // Cherry-picked out of nursery (base turns the category off).
    'react/require-render-return': 'error',

    // React 17+ JSX transform makes `import React` unnecessary.
    'react/react-in-jsx-scope': 'off',

    // Component / JSX style preferences.
    // Note: oxlint does not yet port `react/function-component-definition`
    // (arrow vs declaration), so consistency is left to oxfmt + reviewers.
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    // PascalCase component names — the JSX counterpart to base's kebab-case
    // filename rule; not something oxfmt normalizes.
    'react/jsx-pascal-case': 'error',
    // `[value, setValue]` naming symmetry for useState.
    'react/hook-use-state': 'error',
    // Prefer `<>` over `<React.Fragment>` where no key/props are needed.
    'react/jsx-fragments': 'error',
    // Function components only; class error boundaries stay allowed via the
    // rule's default `allowErrorBoundary`.
    'react/prefer-function-component': 'error',

    // Cherry-picked from `restriction` category.
    'react/button-has-type': 'error',
    // Compound components (`export const Foo = { Root, Item } as const`)
    // are common enough that enforcing only-component exports causes more
    // friction than the marginal Fast Refresh benefit is worth, so
    // `react/only-export-components` stays at its category default (off).
  },
};
