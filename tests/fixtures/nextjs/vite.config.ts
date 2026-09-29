import { defineConfig } from 'vite-plus';

import { nextjs } from '../../../dist/configs/nextjs.mjs';

export default defineConfig({ lint: { extends: [nextjs] } });
