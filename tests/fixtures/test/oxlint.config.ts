import { defineConfig } from 'oxlint';

import { test } from '../../../dist/configs/test.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({
  extends: [typescript],
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      plugins: [...(test.plugins ?? [])],
      rules: test.rules ?? {},
    },
  ],
});
