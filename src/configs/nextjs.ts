import type { OxlintConfig } from 'oxlint';

import { NEXTJS_PLUGINS } from '../_shared.js';
import { react } from './react.js';

/**
 * Next.js (App Router) config.
 * In monorepos, set `settings.next.rootDir` on the consumer side.
 *
 * The `nextjs/*` correctness rules are already enabled by the categories; only
 * the ones we downgrade to warn (and the filename-case override) are listed.
 */
export const nextjs: OxlintConfig = {
  extends: [react],
  plugins: [...NEXTJS_PLUGINS],
  rules: {
    'nextjs/no-img-element': 'warn',
    'nextjs/google-font-display': 'warn',
    'nextjs/google-font-preconnect': 'warn',
    'nextjs/no-page-custom-font': 'warn',
    'nextjs/no-css-tags': 'warn',
    'nextjs/no-styled-jsx-in-document': 'warn',
    'nextjs/no-before-interactive-script-outside-document': 'warn',

    // Allow Next.js dynamic-segment filenames (`[id].tsx`, `[...slug].tsx`,
    // `[[...slug]].tsx`) to bypass kebab-case enforcement. Route-group and
    // parallel-route folders (`(group)`, `@modal`) are directories and are
    // not checked by `filename-case`.
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['^\\[.+\\]', '^\\[\\[.+\\]\\]'],
      },
    ],
  },
};
