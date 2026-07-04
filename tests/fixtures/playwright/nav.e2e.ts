// Deliberate Playwright violation for the behavioral lint test.
import { test } from '@playwright/test';

test.only('focused e2e', async () => {});
