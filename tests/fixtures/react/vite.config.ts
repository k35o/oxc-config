import { defineConfig } from 'vite-plus';

import { react } from '../../../dist/configs/react.mjs';

export default defineConfig({ lint: { extends: [react] } });
