import { defineConfig } from 'oxlint';

import { regexp } from '../../../dist/configs/regexp.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

// typeAware is off so the behavioral lint test does not need `oxlint-tsgolint`
// on PATH (the standalone oxlint binary cannot find it in CI).
export default defineConfig({
  extends: [typescript, regexp],
  options: { typeAware: false },
});
