import { defineConfig } from 'vite-plus';

import { typescript } from '../../../dist/configs/typescript.mjs';

// Spreading sets `plugins` on the root config, which replaces oxlint's default
// plugin set instead of adding to it.
export default defineConfig({ lint: { ...typescript } });
