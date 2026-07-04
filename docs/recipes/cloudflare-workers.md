# Recipe: Cloudflare Workers / Hono

The `backend` layer extends `typescript` → `base` and adds Node/runtime rules.
It relaxes `no-console` (servers log to stdout) and tightens the
promise/callback-mixing rules to error, since an unhandled rejection can crash a
long-running worker.

## Vite+

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus';
import { backend, fmt, test, TEST_GLOBS } from '@k8o/oxc-config';

export default defineConfig({
  fmt,
  lint: {
    extends: [backend],
    options: {
      reportUnusedDisableDirectives: 'error',
      typeAware: true,
    },
    overrides: [{ files: [...TEST_GLOBS], ...test }],
  },
});
```

Add `regexp` to `extends` if the worker parses untrusted input — a
super-linear-backtracking regex on a request path is a denial-of-service vector,
and `regexp/no-super-linear-backtracking` catches it.

## Env access

`node/no-process-env` is a **warning**, not an error: reading `process.env`
directly is fine in a small worker but a smell at scale. On Cloudflare Workers
you usually receive bindings via the `env` argument rather than `process.env`
anyway, so this rarely fires. Centralize env parsing (e.g. a typed `env.ts`) and
the warning stays contained.

## Hono specifics

- Hono handlers are plain async functions; `typescript/no-floating-promises` and
  `no-misused-promises` (inherited, at error) catch the classic
  forgotten-`await` bugs in middleware.
- If you use `c.executionCtx.waitUntil(promise)` for fire-and-forget work, that
  is a legitimate floating promise — wrap it so the intent is explicit, or
  disable the rule inline on that line.

## CLIs

`backend` also fits Node CLIs. Note that `unicorn/no-process-exit` and
`node/no-sync` are **not** enabled here — `process.exit()` and synchronous fs at
startup are idiomatic in CLIs, and turning them on would fight the layer's own
stated scope. Enable them yourself if your CLI is really a long-lived daemon.
