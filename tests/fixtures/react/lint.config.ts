import { defineConfig } from 'vite-plus';

import { react } from '../../../dist/configs/react.mjs';

// typeAware is off because the fixture has no React types to resolve; without
// them every JSX expression is an `error` type and the unsafe-* rules fire.
export default defineConfig({
  lint: {
    extends: [react],
    options: { typeAware: false },
  },
});
