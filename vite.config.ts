import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    trailingComma: 'all',
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
