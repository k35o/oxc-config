import regexpPlugin from 'eslint-plugin-regexp';
import { describe, expect, test } from 'vite-plus/test';

import { regexp } from '../dist/configs/regexp.mjs';
import { storybook } from '../dist/configs/storybook.mjs';
import { diagnose } from './oxlint.ts';

// `--print-config` silently drops jsPlugins rules (oxc#22117), so the only way
// to guard the tailwind / regexp / html-nest / playwright layers is to actually
// lint a file that violates them and assert the diagnostic shows up.
describe('jsPlugin layers fire on real violations', () => {
  test('tailwind: no-duplicate-classes', () => {
    expect(diagnose('tailwind', 'sample.tsx')).toContain(
      '2 tailwindcss(no-duplicate-classes)',
    );
  });

  test('regexp: dupe character class + empty alternative', () => {
    expect(diagnose('regexp', 'sample.ts')).toEqual([
      '2 regexp(no-dupe-characters-character-class)',
      '3 regexp(no-empty-alternative)',
    ]);
  });

  test('html-nest: valid-html-nesting', () => {
    expect(diagnose('html-nest', 'sample.tsx')).toEqual([
      '5 html-nest(valid-html-nesting)',
    ]);
  });

  test('playwright: no-focused-test', () => {
    expect(diagnose('playwright', 'nav.e2e.ts')).toEqual([
      '4 playwright(no-focused-test)',
    ]);
  });
});

// A plugin update can add rules the layer has never decided on. These fail on
// the Renovate PR that introduces them instead of drifting silently.
describe('jsPlugin layers keep up with their plugin', () => {
  const rulesOf = (rules: object, prefix: string): string[] =>
    Object.keys(rules)
      .filter((name) => name.startsWith(`${prefix}/`))
      .toSorted();

  test('regexp covers the plugin’s recommended rules', () => {
    const { rules } = regexpPlugin.configs['flat/recommended'];

    expect(rulesOf(regexp.rules ?? {}, 'regexp')).toEqual(
      rulesOf(rules ?? {}, 'regexp'),
    );
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
});
