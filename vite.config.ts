import { defineConfig } from 'vite-plus';

// Inline a minimal fmt / lint config here. The full presets live under
// `src/configs/` but vp's lint/fmt config loader does not transform TS
// imports, so we cannot reference them from this file. Importing from
// `dist/` would create a chicken-and-egg in CI (vp pack loads this
// config before producing dist).
export default defineConfig({
  fmt: {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    sortImports: true,
    sortPackageJson: true,
    ignorePatterns: ['CHANGELOG.md'],
  },
  lint: {
    ignorePatterns: ['CHANGELOG.md'],
    options: {
      typeAware: true,
    },
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
