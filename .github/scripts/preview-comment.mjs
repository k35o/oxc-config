#!/usr/bin/env node
// プリセットプレビューのデプロイ先URLをまとめたPRコメント本文(Markdown)を
// 標準出力に書く。Cloudflare Pages へのデプロイURLは PREVIEW_URL で受け取る。
//
// 使い方: PREVIEW_URL=https://pr-1.oxc-config-preview.pages.dev \
//         node .github/scripts/preview-comment.mjs
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const marker = '<!-- oxc-config-preview -->';
const baseUrl = (process.env['PREVIEW_URL'] ?? '').replace(/\/+$/u, '');
const runUrl = process.env['RUN_URL'] ?? '';

const root = resolve(import.meta.dirname, '..', '..');
const presets = readdirSync(resolve(root, 'previews'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const lines = [marker, '## 🔍 Preset previews', ''];

if (baseUrl === '') {
  // CLOUDFLARE_API_TOKEN 未登録などでデプロイをスキップした場合のフォールバック
  lines.push(
    'プレビューのデプロイはスキップされました（`CLOUDFLARE_API_TOKEN` 未登録の可能性）。',
  );
  if (runUrl !== '') {
    lines.push('', `生成ログ: ${runUrl}`);
  }
} else {
  lines.push(
    `各 lint プリセットの effective ルールをブラウザで確認できます → **[一覧を開く](${baseUrl}/)**`,
    '',
    '| preset | preview |',
    '| --- | --- |',
  );
  for (const preset of presets) {
    lines.push(
      `| \`${preset}\` | [${preset}.html](${baseUrl}/${preset}.html) |`,
    );
  }
  lines.push(
    '',
    '<sub>このPRのブランチに対応する最新のプレビューです。push のたびに更新されます。</sub>',
  );
}

process.stdout.write(`${lines.join('\n')}\n`);
