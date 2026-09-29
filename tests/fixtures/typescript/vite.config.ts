import { defineConfig } from 'vite-plus';

import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({ lint: { extends: [typescript] } });
