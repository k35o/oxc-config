import { defineConfig } from 'vite-plus';
import { nextjs } from '../../src/configs/nextjs.ts';

// Preview of the `nextjs` lint preset. Open with `pnpm preview:nextjs`
// from the repo root — vite-plus-inspector resolves the full extends chain
// (nextjs → react → typescript → base) and shows the effective rules.
export default defineConfig({
  lint: {
    extends: [nextjs],
  },
});
