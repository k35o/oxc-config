import { defineConfig } from 'vite-plus';
import { base } from '../../src/configs/base.ts';

// Preview of the `base` lint preset. Open with `pnpm preview:base`.
export default defineConfig({
  lint: {
    extends: [base],
  },
});
