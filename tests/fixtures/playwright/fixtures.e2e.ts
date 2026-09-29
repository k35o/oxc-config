// Playwright requires a fixture's first parameter to be an object
// destructuring pattern, even when the fixture depends on nothing.
import { test as base } from '@playwright/test';

export const test = base.extend<{ seed: number }>({
  seed: async ({}, use) => {
    await use(42);
  },
});
