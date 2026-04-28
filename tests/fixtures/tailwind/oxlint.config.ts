import { defineConfig } from 'oxlint';

import { react } from '../../../dist/configs/react.mjs';
import { tailwind } from '../../../dist/configs/tailwind.mjs';

export default defineConfig({ extends: [react, tailwind] });
