import { defineConfig } from 'vite-plus';
import { typescript } from '../../src/configs/typescript.ts';

// Preview of the `typescript` lint preset. Open with `pnpm preview:typescript`.
export default defineConfig({
  lint: {
    extends: [typescript],
  },
});
