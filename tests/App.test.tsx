import { it, expect, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { mockCharacters } from './__mocks__/characters';

import { Character } from '../src/types/character.type';
import userEvent from '@testing-library/user-event';

import * as api from '../src/api/startrek';
import * as storage from '../src/utils/storage';

vi.mock('../src/api/startrek');
vi.mock('../src/utils/storage');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Integration Tests
  it('should make initial API call on mount with value from localStorage', async () => {
    vi.spyOn(storage, 'getSearch').mockReturnValue(mockCharacters[0].name);
    vi.spyOn(api, 'getCharacters').mockResolvedValue({
      characters: mockCharacters,
    });

    render(<App />);

    expect(api.getCharacters).toHaveBeenCalledWith(mockCharacters[0].name);

    await waitFor(() => {
      expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    });
  });

  it('should show loading state while fetching characters', async () => {
    vi.spyOn(storage, 'getSearch').mockReturnValue(mockCharacters[0].name);

    let resolvePromise: (value: { characters: Character[] }) => void = () => {};
    const pending = new Promise((res) => {
      resolvePromise = res;
    });

    vi.spyOn(api, 'getCharacters').mockReturnValue(pending);

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    resolvePromise({ characters: mockCharacters });

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('should call API with correct parameters on search', async () => {
    vi.spyOn(storage, 'getSearch').mockReturnValue('');
    const apiSpy = vi
      .spyOn(api, 'getCharacters')
      .mockResolvedValue({ characters: mockCharacters });

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'data');
    await userEvent.click(button);

    expect(apiSpy).toHaveBeenCalledWith('data');
  });

  it('should handle API errors gracefully', async () => {
    vi.spyOn(storage, 'getSearch').mockReturnValue('x');
    vi.spyOn(api, 'getCharacters').mockRejectedValue(
      new Error('Server exploded')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Server exploded/i)).toBeInTheDocument();
    });
  });

  // State Management Tests
  it('should update characters state after successful response', async () => {
    vi.spyOn(storage, 'getSearch').mockReturnValue(mockCharacters[0].name);
    vi.spyOn(api, 'getCharacters').mockResolvedValue({
      characters: mockCharacters,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    });
  });

  // Additional tests for coverage
  it('should handle unknown errors gracefully', async () => {
    vi.spyOn(storage, 'getSearch').mockReturnValue('someTerm');
    // Throwing something that is not an Error instance (e.g., a string)
    vi.spyOn(api, 'getCharacters').mockImplementation(() => {
      throw 'oops'; // non-Error object
    });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/an unknown error occurred/i)
      ).toBeInTheDocument();
    });
  });
});
