import type { OxlintConfig } from 'oxlint';

import { NEXTJS_PLUGINS } from '../_shared.js';
import { react } from './react.js';

/**
 * Next.js (App Router) config.
 * In monorepos, set `settings.next.rootDir` on the consumer side.
 */
export const nextjs: OxlintConfig = {
  extends: [react],
  plugins: [...NEXTJS_PLUGINS],
  rules: {
    'nextjs/no-html-link-for-pages': 'error',
    'nextjs/no-sync-scripts': 'error',
    'nextjs/no-typos': 'error',
    'nextjs/no-duplicate-head': 'error',
    'nextjs/no-document-import-in-page': 'error',
    'nextjs/no-head-element': 'error',
    'nextjs/no-head-import-in-document': 'error',
    'nextjs/no-script-component-in-head': 'error',
    'nextjs/no-title-in-document-head': 'error',
    'nextjs/no-unwanted-polyfillio': 'error',
    'nextjs/inline-script-id': 'error',
    'nextjs/next-script-for-ga': 'error',

    'nextjs/no-img-element': 'warn',
    'nextjs/google-font-display': 'warn',
    'nextjs/google-font-preconnect': 'warn',
    'nextjs/no-page-custom-font': 'warn',
    'nextjs/no-css-tags': 'warn',
    'nextjs/no-styled-jsx-in-document': 'warn',
    'nextjs/no-before-interactive-script-outside-document': 'warn',
    'nextjs/no-assign-module-variable': 'error',

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
