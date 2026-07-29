import { defineConfig } from 'vite-plus';

import { htmlNest } from '../../src/configs/html-nest.ts';

// Preview of the `html-nest` lint preset (@k8o/html-nest JS plugin rule;
// compose on top of any JSX layer via extends). Open with
// `pnpm preview:html-nest`.
export default defineConfig({
  lint: {
    extends: [htmlNest],
  },
});
