import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');
const oxlintBin = resolve(repoRoot, 'node_modules', 'oxlint', 'bin', 'oxlint');

type Report = {
  diagnostics: {
    code: string;
    severity: string;
    labels: { span: { line: number } }[];
  }[];
};

export function runOxlint(fixture: string, args: string[]) {
  return spawnSync(process.execPath, [oxlintBin, ...args], {
    cwd: resolve(repoRoot, 'tests', 'fixtures', fixture),
    encoding: 'utf8',
    // Use a clean env: vp test injects vite-plus paths into NODE_OPTIONS /
    // NODE_PATH, which makes the standalone oxlint binary resolve vite-plus's
    // config loader and reject our oxlint.config.ts.
    env: {
      PATH: process.env['PATH'] ?? '',
      HOME: process.env['HOME'] ?? '',
    },
  });
}

/** Diagnostics as `<line> <rule>` strings, ordered by line then rule. */
export function diagnose(
  fixture: string,
  file: string,
  config = 'oxlint.config.ts',
): string[] {
  const { stdout, stderr } = runOxlint(fixture, [
    '-c',
    config,
    '-f',
    'json',
    file,
  ]);
  let report: Report;
  try {
    report = JSON.parse(stdout) as Report;
  } catch (error) {
    throw new Error(
      `oxlint did not produce a report for "${fixture}/${file}":\nstderr:\n${stderr}\nstdout:\n${stdout}`,
      { cause: error },
    );
  }
  return report.diagnostics
    .map(({ code, labels }) => ({ code, line: labels[0]?.span.line ?? 0 }))
    .toSorted((a, b) => a.line - b.line || a.code.localeCompare(b.code))
    .map(({ code, line }) => `${line} ${code}`);
}
