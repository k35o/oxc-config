import { defineConfig } from 'oxlint';

import { PLAYWRIGHT_GLOBS } from '../../../dist/_shared.mjs';
import { playwright } from '../../../dist/configs/playwright.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

// typeAware is off so the behavioral lint test does not need `oxlint-tsgolint`
// on PATH (the standalone oxlint binary cannot find it in CI).
export default defineConfig({
  extends: [typescript],
  options: { typeAware: false },
  overrides: [
    {
      files: [...PLAYWRIGHT_GLOBS],
      jsPlugins: playwright.jsPlugins ?? [],
      rules: playwright.rules ?? {},
    },
  ],
});
