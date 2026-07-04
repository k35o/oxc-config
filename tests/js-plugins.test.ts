import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, test } from 'vite-plus/test';

import { playwright } from '../dist/configs/playwright.mjs';
import { storybook } from '../dist/configs/storybook.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const oxlintBin = resolve(repoRoot, 'node_modules', 'oxlint', 'bin', 'oxlint');

// `--print-config` silently drops jsPlugins rules (oxc#22117), so the only way
// to guard the tailwind / regexp / playwright layers is to actually lint a file
// that violates them and assert the diagnostic shows up.
function lint(fixture: string, file: string): string {
  const cwd = resolve(here, 'fixtures', fixture);
  const cleanEnv = {
    PATH: process.env.PATH ?? '',
    HOME: process.env.HOME ?? '',
  };
  try {
    return execFileSync(
      process.execPath,
      [oxlintBin, '-c', 'oxlint.config.ts', file],
      {
        cwd,
        encoding: 'utf8',
        env: cleanEnv,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );
  } catch (err) {
    // oxlint exits non-zero when it finds errors; the diagnostics are on stdout.
    const isObj = typeof err === 'object' && err !== null;
    return isObj && 'stdout' in err && typeof err.stdout === 'string'
      ? err.stdout
      : '';
  }
}

describe('jsPlugin layers fire on real violations', () => {
  test('tailwind: no-duplicate-classes', () => {
    const out = lint('tailwind', 'sample.tsx');
    expect(out).toContain('tailwindcss(no-duplicate-classes)');
  });

  test('regexp: dupe character class + empty alternative', () => {
    const out = lint('regexp', 'sample.ts');
    expect(out).toContain('regexp(no-dupe-characters-character-class)');
    expect(out).toContain('regexp(no-empty-alternative)');
  });

  test('playwright: no-focused-test', () => {
    const out = lint('playwright', 'nav.e2e.ts');
    expect(out).toContain('playwright(no-focused-test)');
  });
});

describe('storybook layer shape', () => {
  // The storybook plugin imports the `storybook` package at load time, so it
  // can only be linted inside a real Storybook project. Guard the exported
  // shape instead: every rule key is a storybook/* rule and the layer relaxes
  // the two rules that fight story files.
  test('exports a jsPlugin config with storybook rules', () => {
    expect(storybook.jsPlugins).toContain('eslint-plugin-storybook');
    const rules = storybook.rules ?? {};
    const keys = Object.keys(rules);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      const ok =
        key.startsWith('storybook/') ||
        key === 'unicorn/no-anonymous-default-export' ||
        key === 'react/rules-of-hooks';
      expect(ok).toBe(true);
    }
    expect(rules['unicorn/no-anonymous-default-export']).toBe('off');
  });

  test('playwright globs stay disjoint from vitest globs', () => {
    // A `.e2e.ts` file must not also match `**/*.test.ts` / `**/*.spec.ts`.
    expect(playwright.jsPlugins).toContain('eslint-plugin-playwright');
  });
});
