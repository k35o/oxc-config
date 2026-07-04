import { defineConfig } from 'oxlint';

import { TEST_GLOBS } from '../../../dist/_shared.mjs';
import { test } from '../../../dist/configs/test.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({
  extends: [typescript],
  overrides: [
    {
      files: [...TEST_GLOBS],
      plugins: test.plugins ?? [],
      env: test.env ?? {},
      rules: test.rules ?? {},
    },
  ],
});
