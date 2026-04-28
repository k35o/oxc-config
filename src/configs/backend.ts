import type { OxlintConfig } from 'oxlint';

import { BACKEND_PLUGINS } from '../_shared.js';
import { typescript } from './typescript.js';

/**
 * Backend config for Node, Cloudflare Workers, Hono servers, CLIs.
 * `no-console` is relaxed (servers log to stdout); env access is warned.
 */
export const backend: OxlintConfig = {
  extends: [typescript],
  plugins: [...BACKEND_PLUGINS],
  rules: {
    'no-console': 'off',

    'unicorn/no-process-exit': 'off',
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/no-process-env': 'warn',
    'node/handle-callback-err': 'error',

    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',

    'promise/no-callback-in-promise': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-in-finally': 'error',
  },
};
