import { defineConfig } from 'oxlint';

import { nextjs } from '../../../dist/configs/nextjs.mjs';

// typeAware is off because the fixture has no React types to resolve; without
// them every JSX expression is an `error` type and the unsafe-* rules fire.
export default defineConfig({
  extends: [nextjs],
  options: { typeAware: false },
});
