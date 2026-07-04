import { defineConfig } from 'oxlint';

import { regexp } from '../../../dist/configs/regexp.mjs';
import { typescript } from '../../../dist/configs/typescript.mjs';

export default defineConfig({ extends: [typescript, regexp] });
