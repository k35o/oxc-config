import type { OxlintConfig } from 'oxlint';

import { TS_PLUGINS } from '../_shared.js';
import { base } from './base.js';

/**
 * TypeScript config for pure TS projects (CLIs, libraries, utilities).
 * Type-aware rules are enabled — consumers must install `oxlint-tsgolint`.
 */
export const typescript: OxlintConfig = {
  extends: [base],
  plugins: [...TS_PLUGINS],
  options: {
    typeAware: true,
  },
  rules: {
    'typescript/no-explicit-any': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/consistent-type-exports': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/await-thenable': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-import-type-side-effects': 'error',
    'typescript/no-implied-eval': 'error',
    'typescript/return-await': ['error', 'in-try-catch'],
    'typescript/no-deprecated': 'warn',
    'typescript/array-type': ['error', { default: 'array-simple' }],
    'typescript/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 10,
      },
    ],
  },
};
