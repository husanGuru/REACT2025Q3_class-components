import { vi, describe, it, expect } from 'vitest';
import { getCharacters } from '../src/api/startrek';

describe('getCharacters', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('should send POST request with correct body and headers and returns data', async () => {
    const mockData = { characters: [{ uid: '123', name: 'Spock' }] };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await getCharacters('Spock');

    expect(fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/character/search',
      {
        method: 'POST',
        body: 'name=Spock',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    expect(result).toEqual(mockData);
  });

  it('should throw error if response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getCharacters('Spock')).rejects.toThrow(
      'HTTP error! status: 500'
    );
  });
});
