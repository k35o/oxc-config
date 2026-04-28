import { defineConfig } from 'oxlint';

import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({ extends: [typescript] });
