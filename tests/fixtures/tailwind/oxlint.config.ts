import { defineConfig } from 'oxlint';

import { react } from '../../../dist/configs/react.mjs';
import { tailwind } from '../../../dist/configs/tailwind.mjs';

// typeAware is off because the fixture has no React types to resolve; without
// them every JSX expression is an `error` type and the unsafe-* rules fire.
export default defineConfig({
  extends: [react, tailwind],
  options: { typeAware: false },
  settings: { tailwindcss: { entryPoint: './app.css' } },
});
