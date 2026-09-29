// Idiomatic TypeScript the `typescript` preset must accept without a single
// diagnostic.

// An `as const` object paired with a same-named type is the enum alternative
// this preset steers toward.
export const Status = { Active: 'active', Inactive: 'inactive' } as const;
export type Status = (typeof Status)[keyof typeof Status];

const RETRY_LIMIT = 3; // attempts
const DIGITS = /\d+/;

type Page = { cursor?: string; items: string[] };
type Doc = { _id: string };

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAll(
  next: (cursor?: string) => Promise<Page>,
): Promise<string[]> {
  const items: string[] = [];
  let cursor: string | undefined;
  for (let attempt = 0; attempt < RETRY_LIMIT; attempt += 1) {
    const page = await next(cursor);
    items.push(...page.items);
    cursor = page.cursor;
    if (cursor === undefined) {
      break;
    }
  }
  return items;
}

export async function load(url: string): Promise<Response> {
  return fetch(url);
}

export function parsePort(value: string | undefined): number {
  return Number.parseInt(value ?? '3000', 10);
}

export function extractDigits(text: string): string | undefined {
  return DIGITS.exec(text)?.[0];
}

export function describeOption(option: {
  disabled?: boolean;
  label?: string;
}): string {
  if (option.disabled) {
    return 'disabled';
  }
  if (option.label) {
    return option.label;
  }
  return 'unnamed';
}

export function isMissing(value: string | null | undefined): boolean {
  return value == null;
}

export function ids(docs: Doc[]): string[] {
  return docs.map((doc) => doc._id);
}

export function parseAll(
  values: string[],
  parse: (value: string) => number,
): number[] {
  return values.map(parse);
}

export function firstOrFallback(items: string[], fallback: string): string {
  if (items.length) {
    return items[0] ?? fallback;
  }
  return fallback;
}

export function fontWeight(kind: 'light' | 'regular' | 'bold'): number {
  switch (kind) {
    case 'bold': {
      return 700;
    }
    default: {
      return 400;
    }
  }
}

export function total(prices: number[]): number {
  const withTax = (price: number): number => price * 1.1;
  return prices.reduce((sum, price) => sum + withTax(price), 0);
}

export function notify(channel: BroadcastChannel, message: string): void {
  channel.postMessage(message);
}

export function onSettled(task: Promise<void>, log: () => void): void {
  void task.then(() => {
    log();
  });
}
