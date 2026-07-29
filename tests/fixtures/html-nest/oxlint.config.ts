import { defineConfig } from 'oxlint';

import { htmlNest } from '../../../dist/configs/html-nest.mjs';
import { react } from '../../../dist/configs/react.mjs';

// typeAware is off so the behavioral lint test does not need `oxlint-tsgolint`
// on PATH (the standalone oxlint binary cannot find it in CI).
export default defineConfig({
  extends: [react, htmlNest],
  options: { typeAware: false },
});
