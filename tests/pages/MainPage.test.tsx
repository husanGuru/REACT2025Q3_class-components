import { describe, vi, it, expect, beforeEach, Mock } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../test-utils';
import MainPage from '../../src/pages/MainPage';

import { Character } from '../../src/types/character.types';

// Mock subcomponents
vi.mock('../components/Search/Search', () => ({
  default: ({
    onChange,
    value,
  }: {
    onChange: (v: string) => void;
    value: string;
  }) => (
    <input
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));
vi.mock('../components/ErrorResult/ErrorResult', () => ({
  default: ({ error }: { error: string }) => <div>Error: {error}</div>,
}));
vi.mock('../components/Loading/Loading', () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock('../components/Result/Result', () => ({
  default: ({ characters }: { characters: Character[] }) => (
    <div>
      {characters.map((char) => (
        <div key={char.uid}>{char.name}</div>
      ))}
    </div>
  ),
}));
vi.mock('../components/Pagination/Pagination', () => ({
  default: ({
    page,
    onChange,
  }: {
    page: number;
    onChange: (v: number) => void;
  }) => <button onClick={() => onChange(page + 1)}>Next</button>,
}));

// Mock useLocalStorage
vi.mock('../hooks/useLocalStorage', () => ({
  default: () => ['spock', vi.fn()],
}));

// Mock API
vi.mock('../../src/api/startrek', () => ({
  getCharacters: vi.fn(),
}));

import { getCharacters } from '../../src/api/startrek';

const mockCharacters = {
  page: {
    totalPages: 3,
  },
  characters: [
    { id: 1, name: 'Spock' },
    { id: 2, name: 'Kirk' },
  ],
};

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', async () => {
    (getCharacters as Mock).mockImplementation(() => {
      return new Promise(() => {}); // never resolves
    });

    renderWithProviders(<MainPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders characters after fetch', async () => {
    (getCharacters as Mock).mockResolvedValue(mockCharacters);

    renderWithProviders(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Spock')).toBeInTheDocument();
      expect(screen.getByText('Kirk')).toBeInTheDocument();
    });
  });

  it('renders error on failure', async () => {
    (getCharacters as Mock).mockRejectedValue(new Error('API failed'));

    renderWithProviders(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText(/API failed/)).toBeInTheDocument();
    });
  });
});
