import { defineConfig } from 'vite-plus';

import { regexp } from '../../src/configs/regexp.ts';

// Preview of the `regexp` lint preset (eslint-plugin-regexp JS plugin rules;
// compose on top of any layer via extends). Open with `pnpm preview:regexp`.
export default defineConfig({
  lint: {
    extends: [regexp],
  },
});
