import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { downloadCSV } from '../../src/utils/csv';
import { mockCharacters } from '../__mocks__/characters';

describe('downloadCSV', () => {
  const createObjectURLMock = vi.fn(() => 'blob:http://localhost/fake-blob');

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: createObjectURLMock,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create a CSV and trigger download', async () => {
    const anchor = document.createElement('a');
    const clickMock = vi.fn();

    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        if (tagName === 'a') {
          anchor.click = clickMock;
          return anchor;
        }
        return document.createElement(tagName);
      }
    );

    vi.spyOn(document.body, 'appendChild');
    vi.spyOn(document.body, 'removeChild');

    downloadCSV([mockCharacters[0]]);

    expect(createObjectURLMock).toHaveBeenCalledOnce();
    expect(document.body.appendChild).toHaveBeenCalledWith(anchor);
    expect(clickMock).toHaveBeenCalledOnce();
    expect(document.body.removeChild).toHaveBeenCalledWith(anchor);
    expect(anchor.download).toBe('1_items.csv');
  });
});
