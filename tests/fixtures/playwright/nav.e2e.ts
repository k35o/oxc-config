// Deliberate Playwright violation for the behavioral lint test.
import { expect, test } from '@playwright/test';

test.only('focused e2e', async ({ page }) => {
  await expect(page).toHaveTitle('Home');
});
