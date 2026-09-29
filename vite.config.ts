import { defineConfig } from 'vite-plus';

import { TEST_GLOBS } from './src/_shared.ts';
import { fmt } from './src/configs/fmt.ts';
import { test } from './src/configs/test.ts';
import { typescript } from './src/configs/typescript.ts';

export default defineConfig({
  fmt: {
    ...fmt,
    // .changeset/（ledger.yaml 等）は pnpm が生成・所有するファイルなので、
    // こちらの整形規則を当てない。tests/fixtures/** は意図的な違反を含む入力で、
    // 整形すると違反（重複した Tailwind クラスなど）が消えてしまう。
    ignorePatterns: [
      'CHANGELOG.md',
      '.changeset',
      'previews/**',
      'tests/fixtures/**',
    ],
  },
  lint: {
    // scripts/** と .github/scripts/** は tsconfig 外の tooling 用 .mjs。
    // typeAware lint は project に含まれないファイルで失敗するため除外する。
    // tests/fixtures/** はプリセットを検証するための入力で、意図的な違反を含む。
    ignorePatterns: [
      'CHANGELOG.md',
      '.changeset',
      'previews/**',
      'dist-preview/**',
      'scripts/**',
      '.github/scripts/**',
      'tests/fixtures/**',
    ],
    extends: [typescript],
    options: {
      reportUnusedDisableDirectives: 'error',
    },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
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
});
