import { defineConfig } from 'vite-plus';

import { htmlNest } from '../../../dist/configs/html-nest.mjs';
import { react } from '../../../dist/configs/react.mjs';

// typeAware is off because the fixture has no React types to resolve; without
// them every JSX expression is an `error` type and the unsafe-* rules fire.
export default defineConfig({
  lint: {
    extends: [react, htmlNest],
    options: { typeAware: false },
  },
});
