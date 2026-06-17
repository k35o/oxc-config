import { defineConfig } from 'vite-plus';
import { backend } from '../../src/configs/backend.ts';

// Preview of the `backend` lint preset. Open with `pnpm preview:backend`.
export default defineConfig({
  lint: {
    extends: [backend],
  },
});
