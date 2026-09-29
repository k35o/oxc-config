import { defineConfig } from 'vite-plus';

import { base } from '../../../dist/configs/base.mjs';

export default defineConfig({ lint: { extends: [base] } });
