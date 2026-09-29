import type { OxlintConfig } from 'vite-plus/lint';

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
    // `jsx-a11y/*` rules the categories enable at error, downgraded because
    // they fire on patterns that are often legitimate.
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/media-has-caption': 'warn',
    'jsx-a11y/mouse-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-tabindex': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    // Not in eslint-plugin-jsx-a11y's recommended or strict sets. It rejects
    // the listbox / menu markup the allow-list below exists to permit, along
    // with `role="img"` on `<span>`, `role="group"` and `role="status"`.
    'jsx-a11y/prefer-tag-over-role': 'off',
    // The defaults reject empty table cells and separators, which need no
    // label. Icon-only buttons and empty links are still caught.
    'jsx-a11y/control-has-associated-label': [
      'error',
      {
        ignoreElements: [
          'audio',
          'canvas',
          'embed',
          'input',
          'textarea',
          'tr',
          'video',
          'td',
          'th',
        ],
        ignoreRoles: [
          'grid',
          'listbox',
          'menu',
          'menubar',
          'radiogroup',
          'row',
          'tablist',
          'toolbar',
          'tree',
          'treegrid',
          'separator',
        ],
      },
    ],
    // eslint-plugin-jsx-a11y's recommended allow-list: the ARIA Authoring
    // Practices build listboxes, menus and grids from these elements.
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        ul: [
          'listbox',
          'menu',
          'menubar',
          'radiogroup',
          'tablist',
          'tree',
          'treegrid',
        ],
        ol: [
          'listbox',
          'menu',
          'menubar',
          'radiogroup',
          'tablist',
          'tree',
          'treegrid',
        ],
        li: [
          'menuitem',
          'menuitemradio',
          'menuitemcheckbox',
          'option',
          'row',
          'tab',
          'treeitem',
        ],
        table: ['grid'],
        td: ['gridcell'],
        fieldset: ['radiogroup', 'presentation'],
      },
    ],
    // The default word list is English only.
    'jsx-a11y/anchor-ambiguous-text': [
      'warn',
      {
        words: [
          'click here',
          'here',
          'link',
          'a link',
          'learn more',
          'こちら',
          'ここ',
          '詳細',
          '詳しくはこちら',
          'もっと見る',
        ],
      },
    ],

    // React Compiler rules that restate what an established rule already
    // reports (`rules-of-hooks`, `exhaustive-deps`,
    // `no-unstable-nested-components`, `set-state-in-effect`), so every hit was
    // reported twice.
    'react/hooks': 'off',
    'react/memo-dependencies': 'off',
    'react/exhaustive-effect-dependencies': 'off',
    'react/static-components': 'off',
    'react/no-deriving-state-in-effects': 'off',
    // Rejects capitalized library factories (`Color(value)`, Immutable's
    // `List()`) and has no allow-list.
    'react/capitalized-calls': 'off',
    // React Compiler rules with known false positives (hydration flags,
    // floating-ui's `refs.setFloating`) or that describe a missed optimization
    // rather than a bug.
    'react/set-state-in-effect': 'warn',
    'react/refs': 'warn',
    'react/incompatible-library': 'warn',
    'react/preserve-manual-memoization': 'warn',

    // `react/*` rules the categories leave off (or that we downgrade).
    'react/no-danger': 'warn',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/no-object-type-as-default-prop': 'warn',
    // YouTube and Maps embeds need `allow-scripts allow-same-origin`, which the
    // rule rejects.
    'react/iframe-missing-sandbox': 'warn',
    // Cherry-picked out of nursery (base turns the category off).
    'react/require-render-return': 'error',

    // React 17+ JSX transform makes `import React` unnecessary.
    'react/react-in-jsx-scope': 'off',
    // Only `'` and `"` are left to catch (`>` and `}` are parse errors), and
    // they render fine.
    'react/no-unescaped-entities': 'off',
    // Browsers imply `noopener` for `target="_blank"`, and the rule rejects an
    // explicit `rel="noopener"` for lacking `noreferrer`.
    'react/jsx-no-target-blank': 'off',
    // JSX handlers are declared `() => void`, so `onClick={async () => …}` and
    // react-hook-form's `onSubmit={handleSubmit(save)}` are rejected.
    'typescript/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],

    // Component / JSX style preferences.
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    // PascalCase component names — the JSX counterpart to base's kebab-case
    // filename rule; not something oxfmt normalizes.
    'react/jsx-pascal-case': 'error',
    // `[value, setValue]` naming symmetry for useState. Warn: the setter-less
    // `const [client] = useState(() => new QueryClient())` has no opt-out.
    'react/hook-use-state': ['warn', { allowDestructuredState: true }],
    // Prefer `<>` over `<React.Fragment>` where no key/props are needed.
    'react/jsx-fragments': 'error',
    // Function components only; class error boundaries stay allowed via the
    // rule's default `allowErrorBoundary`.
    'react/prefer-function-component': 'error',

    // Cherry-picked from `restriction` category.
    'react/button-has-type': 'error',
    // react.dev lists `Children` and `cloneElement` as legacy APIs.
    'react/no-clone-element': 'warn',
    'react/no-react-children': 'warn',
    // Compound components (`export const Foo = { Root, Item } as const`)
    // are common enough that enforcing only-component exports causes more
    // friction than the marginal Fast Refresh benefit is worth, so
    // `react/only-export-components` stays at its category default (off).
    // `react/no-unknown-property` stays off too: TypeScript already checks DOM
    // props, and the rule lags behind new attributes (`commandfor`).
  },
};
