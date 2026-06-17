import { defineConfig } from 'vite-plus';
import { react } from '../../src/configs/react.ts';

// Preview of the `react` lint preset. Open with `pnpm preview:react`.
export default defineConfig({
  lint: {
    extends: [react],
  },
});
