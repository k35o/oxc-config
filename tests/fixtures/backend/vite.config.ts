import { defineConfig } from 'vite-plus';

import { backend } from '../../../dist/configs/backend.mjs';

export default defineConfig({ lint: { extends: [backend] } });
