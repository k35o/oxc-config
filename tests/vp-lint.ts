import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');
const vp = resolve(repoRoot, 'node_modules', 'vite-plus', 'bin', 'vp');

type Report = {
  diagnostics: Array<{
    code: string;
    severity: string;
    labels: Array<{ span: { line: number } }>;
  }>;
};

/** Runs `vp lint` in a fixture directory, the way a consumer would. */
export function runLint(fixture: string, args: string[]) {
  return spawnSync(process.execPath, [vp, 'lint', ...args], {
    cwd: resolve(repoRoot, 'tests', 'fixtures', fixture),
    encoding: 'utf8',
  });
}

/** Diagnostics as `<line> <rule>` strings, ordered by line then rule. */
export function diagnose(
  fixture: string,
  file: string,
  config = 'vite.config.ts',
): string[] {
  const { stdout, stderr } = runLint(fixture, [
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
      `vp lint did not produce a report for "${fixture}/${file}":\nstderr:\n${stderr}\nstdout:\n${stdout}`,
      { cause: error },
    );
  }
  return report.diagnostics
    .map(({ code, labels }) => ({ code, line: labels[0]?.span.line ?? 0 }))
    .toSorted((a, b) => a.line - b.line || a.code.localeCompare(b.code))
    .map(({ code, line }) => `${line} ${code}`);
}
