import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Result from '../../src/components/Result/Result';
import { mockCharacters } from '../__mocks__/characters';
import { renderWithRouter } from '../test-utils';

describe('Result', () => {
  it('renders character names', () => {
    renderWithRouter(<Result characters={mockCharacters} page={1} />);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  it('should render character description with all defined fields', () => {
    renderWithRouter(<Result characters={mockCharacters} page={1} />);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  it('should render not found text when character list is empty', () => {
    render(<Result characters={[]} page={1} />);
    expect(screen.queryByText(/Characters not found/i)).toBeInTheDocument();
  });
});
