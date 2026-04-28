import { defineConfig } from 'oxlint';

import { nextjs } from '../../../dist/configs/nextjs.mjs';

export default defineConfig({ extends: [nextjs] });
