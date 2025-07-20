import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Result from '../../src/components/Result/Result';
import { Character } from '../../src/types/character.type';

const mockCharacters: Character[] = [
  {
    uid: '1',
    name: 'John Matrix',
    gender: 'male',
    yearOfBirth: 1975,
    placeOfBirth: 'Earth',
    height: 185,
    weight: 90,
    bloodType: 'O+',
    maritalStatus: 'single',
    serialNumber: 'SN123456',
    alternateReality: false,
  },
  {
    uid: '2',
    name: 'Sarah Connor',
    gender: 'female',
    yearOfBirth: 1980,
    placeOfBirth: 'Earth-2',
    height: 170,
    weight: 60,
    bloodType: 'A-',
    maritalStatus: 'divorced',
    serialNumber: 'SN654321',
    alternateReality: true,
  },
];

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
