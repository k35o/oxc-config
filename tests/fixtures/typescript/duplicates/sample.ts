// Every statement below has exactly one problem. Overlapping rules must not
// report it twice.

export function fail(): never {
  throw 'boom';
}

export function reject(): Promise<never> {
  return Promise.reject('boom');
}

export async function compute(): Promise<number> {
  return 1;
}

export function has(items: string[], item: string): boolean {
  return items.indexOf(item) !== -1;
}

export function firstEven(values: number[]): number | undefined {
  return values.filter((value) => value % 2 === 0)[0];
}

export function toggle(flag: boolean): string {
  return !flag ? 'off' : 'on';
}

export function isList(value: unknown): boolean {
  return value instanceof Array;
}

export const boxed = new String('boxed');

export const reset = '\x1b[0m';
