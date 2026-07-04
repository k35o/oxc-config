import { defineConfig } from 'oxlint';

import { react } from '../../../dist/configs/react.mjs';
import { tailwind } from '../../../dist/configs/tailwind.mjs';

// typeAware is off so the behavioral lint test does not need `oxlint-tsgolint`
// on PATH (the standalone oxlint binary cannot find it in CI).
export default defineConfig({
  extends: [react, tailwind],
  options: { typeAware: false },
});
