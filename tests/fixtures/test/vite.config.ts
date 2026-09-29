import { defineConfig } from 'vite-plus';

import { TEST_GLOBS } from '../../../dist/_shared.mjs';
import { test } from '../../../dist/configs/test.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({
  lint: {
    extends: [typescript],
    overrides: [{ files: [...TEST_GLOBS], ...test }],
  },
});
