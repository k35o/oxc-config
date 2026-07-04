import { defineConfig } from 'oxlint';

import { PLAYWRIGHT_GLOBS } from '../../../dist/_shared.mjs';
import { playwright } from '../../../dist/configs/playwright.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({
  extends: [typescript],
  overrides: [
    {
      files: [...PLAYWRIGHT_GLOBS],
      jsPlugins: playwright.jsPlugins ?? [],
      rules: playwright.rules ?? {},
    },
  ],
});
