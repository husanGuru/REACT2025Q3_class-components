import { describe, it, vi, beforeEach, Mock } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import CharacterPage from '../../src/pages/CharacterPage';
import { renderWithProviders } from '../test-utils';
import useCharacter from '../../src/hooks/useCharacter';

const RENDER_OPTIONS = {
  route: '/character/1?page=1',
  path: 'character/:id',
};

vi.mock('../../src/hooks/useCharacter', () => ({
  default: vi.fn(),
}));

describe('CharacterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state', () => {
    (useCharacter as Mock).mockReturnValue({
      isLoading: true,
      error: null,
      character: null,
    });

    renderWithProviders(<CharacterPage />, RENDER_OPTIONS);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render character details on successful fetch', async () => {
    (useCharacter as Mock).mockReturnValue({
      isLoading: false,
      error: null,
      character: { id: 1, name: 'Spock', rank: 'Commander' },
    });

    renderWithProviders(<CharacterPage />, RENDER_OPTIONS);

    await waitFor(() => {
      expect(screen.getByText(/Character Spock details/i)).toBeInTheDocument();
      expect(
        screen.getByText(/id: 1; name: Spock; rank: Commander/i)
      ).toBeInTheDocument();
    });
  });

  it('should render error message on fetch failure', async () => {
    (useCharacter as Mock).mockReturnValue({
      isLoading: false,
      error: new Error('Something went wrong'),
      character: null,
    });

    renderWithProviders(<CharacterPage />, RENDER_OPTIONS);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
