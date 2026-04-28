import { defineConfig } from 'vite-plus';

// Dogfood the published presets. Built artifacts are required first
// (`pnpm build`) — CI runs build before lint, and local dev should too.
import { fmt } from './dist/configs/fmt.mjs';
import { typescript } from './dist/configs/typescript.mjs';

export default defineConfig({
  fmt: {
    ...fmt,
    ignorePatterns: ['CHANGELOG.md'],
  },
  lint: {
    extends: [typescript],
    ignorePatterns: ['CHANGELOG.md'],
    options: {
      typeAware: true,
    },
    overrides: [
      {
        // Config files require default exports.
        files: ['vite.config.ts', 'tests/fixtures/**/oxlint.config.ts'],
        rules: {
          'import/no-default-export': 'off',
        },
      },
    ],
  },
  pack: {
    entry: ['src/**/*.ts'],
    format: 'esm',
    dts: true,
    outDir: 'dist',
    unbundle: true,
    deps: {
      neverBundle: [/^oxlint/, /^oxfmt$/],
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    testTimeout: 30_000,
  },
  staged: {
    '*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}': 'vp check --fix',
  },
});
