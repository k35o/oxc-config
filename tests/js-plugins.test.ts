import tailwindPlugin from 'oxlint-tailwindcss';
import { describe, expect, test } from 'vite-plus/test';

import { tailwind } from '../dist/configs/tailwind.mjs';
import { diagnose } from './vp-lint.ts';

// `--print-config` silently drops jsPlugins rules (oxc#22117), so the only way
// to guard the tailwind / html-nest layers is to actually lint a file that
// violates them and assert the diagnostic shows up.
describe('jsPlugin layers fire on real violations', () => {
  test('tailwind: duplicate and conflicting classes', () => {
    expect(diagnose('tailwind', 'sample.tsx')).toStrictEqual([
      '3 tailwindcss(no-duplicate-classes)',
      '4 tailwindcss(no-conflicting-classes)',
    ]);
  });

  test('html-nest: valid-html-nesting', () => {
    expect(diagnose('html-nest', 'sample.tsx')).toStrictEqual([
      '5 html-nest(valid-html-nesting)',
    ]);
  });
});

// A plugin update can add rules the layer has never decided on. This fails on
// the Renovate PR that introduces them instead of drifting silently.
describe('jsPlugin layers keep up with their plugin', () => {
  const decided = Object.keys(tailwind.rules ?? {}).toSorted();

  test('tailwind decides every rule the plugin ships', () => {
    const shipped = Object.keys(tailwindPlugin.rules)
      .map((name) => `tailwindcss/${name}`)
      .toSorted();

    expect(decided).toStrictEqual(shipped);
  });
});
