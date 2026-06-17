import { defineConfig } from 'vite-plus';
import { tailwind } from '../../src/configs/tailwind.ts';

// Preview of the `tailwind` lint preset (oxlint-tailwindcss JS plugin rules;
// compose on top of react/nextjs in real projects). Open with
// `pnpm preview:tailwind`.
export default defineConfig({
  lint: {
    extends: [tailwind],
  },
});
