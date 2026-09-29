import type { OxlintConfig } from 'vite-plus/lint';

import { NEXTJS_PLUGINS } from '../_shared.js';
import { react } from './react.js';

/**
 * Next.js (App Router) config.
 * In monorepos, set `settings.next.rootDir` on the consumer side.
 *
 * The `nextjs/*` correctness rules are already enabled by the categories; only
 * the ones we downgrade (and the filename-case override) are listed.
 */
export const nextjs: OxlintConfig = {
  extends: [react],
  plugins: [...NEXTJS_PLUGINS],
  rules: {
    'nextjs/no-img-element': 'warn',
    'nextjs/google-font-display': 'warn',
    'nextjs/google-font-preconnect': 'warn',
    'nextjs/no-css-tags': 'warn',
    'nextjs/no-styled-jsx-in-document': 'warn',
    'nextjs/no-before-interactive-script-outside-document': 'warn',
    'nextjs/next-script-for-ga': 'warn',
    // Rejects every internal `href`, including ones `<Link>` cannot serve
    // (`/api/export`, `/rss.xml`).
    'nextjs/no-html-link-for-pages': 'warn',
    // Pages Router only, yet it fires in `app/layout.tsx`.
    'nextjs/no-page-custom-font': 'off',

    // Allow Next.js dynamic-segment filenames (`[id].tsx`, `[...slug].tsx`,
    // `[[...slug]].tsx`) to bypass kebab-case enforcement. Route-group and
    // parallel-route folders (`(group)`, `@modal`) are directories and are
    // not checked by `filename-case`.
    'unicorn/filename-case': [
      'error',
      { case: 'kebabCase', ignore: ['^\\[.+\\]'] },
    ],
  },
  overrides: [
    {
      // Metadata image routes render through `ImageResponse`, where
      // `next/image` is unavailable.
      files: [
        '**/opengraph-image.tsx',
        '**/twitter-image.tsx',
        '**/icon.tsx',
        '**/apple-icon.tsx',
      ],
      rules: { 'nextjs/no-img-element': 'off' },
    },
  ],
};
