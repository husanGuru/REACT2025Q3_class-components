import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { getCharacterById } from '../../src/api/startrek';
import CharacterPage from '../../src/pages/CharacterPage';

// ✅ Mock the API
vi.mock('../../src/api/startrek', () => ({
  getCharacterById: vi.fn(),
}));

const mockCharacter = {
  id: '1',
  name: 'Spock',
  species: 'Vulcan',
  rank: 'Commander',
};

describe('CharacterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character details on successful fetch', async () => {
    (getCharacterById as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      character: mockCharacter,
    });

    render(
      <MemoryRouter initialEntries={['/character/1?page=2']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Character Spock details/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /id: 1; name: Spock; species: Vulcan; rank: Commander/i
        )
      ).toBeInTheDocument();
    });
  });

  it('renders error message on fetch failure', async () => {
    (getCharacterById as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    render(
      <MemoryRouter initialEntries={['/character/1?page=1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('renders fallback for unknown error', async () => {
    (getCharacterById as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      'oops'
    );

    render(
      <MemoryRouter initialEntries={['/character/1?page=1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/an unknown error occurred/i)
      ).toBeInTheDocument();
    });
  });
});
