import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Result from '../../src/components/Result/Result';
import { mockCharacters } from '../__mocks__/characters';

describe('Result', () => {
  it('renders character names', () => {
    render(<Result characters={mockCharacters} />);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  it('should render character description with all defined fields', () => {
    render(<Result characters={mockCharacters} />);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(
        screen.getByText(
          Object.entries(character)
            .filter(([, value]) => value !== null && value !== undefined)
            .map(([name, value]) => `${name}: ${value ?? ''}`)
            .join('; ')
        )
      ).toBeInTheDocument();
    });
  });

  it('should render nothing when character list is empty', () => {
    render(<Result characters={[]} />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
