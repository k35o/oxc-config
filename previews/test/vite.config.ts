import { defineConfig } from 'vite-plus';
import { test } from '../../src/configs/test.ts';

// Preview of the `test` lint preset (jest + vitest rules; normally applied via
// an override on test globs). Open with `pnpm preview:test`.
export default defineConfig({
  lint: {
    extends: [test],
  },
});
