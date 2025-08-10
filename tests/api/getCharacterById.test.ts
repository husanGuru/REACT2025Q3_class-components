import { vi, describe, it, expect } from 'vitest';
import { getCharacterById } from '../../src/api/startrek';

describe('getCharacterById', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should send GET request with correct param and returns data', async () => {
    const mockData = { character: { uid: '123', name: 'Spock' } };
    const ctrl = new AbortController();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await getCharacterById('123', ctrl.signal);

    expect(fetch).toHaveBeenCalledWith(
      `https://stapi.co/api/v1/rest/character?uid=123`,
      { signal: ctrl.signal }
    );
    expect(result).toEqual(mockData);
  });

  it('should throw error if response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getCharacterById('123')).rejects.toThrow(
      'HTTP error! status: 500'
    );
  });
});
