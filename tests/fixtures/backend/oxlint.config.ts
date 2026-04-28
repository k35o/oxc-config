import { defineConfig } from 'oxlint';

import { backend } from '../../../dist/configs/backend.mjs';

export default defineConfig({ extends: [backend] });
