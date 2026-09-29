// Idiomatic Vitest the `test` layer must accept without a single diagnostic.
import { describe, expect, test, vi } from 'vite-plus/test';

describe('formatPrice', () => {
  const format = (value: number): string => `¥${value.toLocaleString('ja-JP')}`;

  test('formats with separators', () => {
    expect(format(1200)).toBe('¥1,200');
  });

  test('calls the listener', () => {
    const listener = vi.fn();
    listener('a');
    expect(listener).toHaveBeenCalledWith('a');
  });

  test('loads sequentially', async () => {
    const load = async (id: number): Promise<number> => id;
    for (const id of [1, 2]) {
      expect(await load(id)).toBe(id);
    }
  });
});

describe('toLocaleString', () => {
  for (const locale of ['en-US', 'ja-JP']) {
    test(locale, () => {
      expect((1200).toLocaleString(locale)).toBe('1,200');
    });
  }
});
