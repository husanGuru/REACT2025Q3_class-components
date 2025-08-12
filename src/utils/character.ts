import { Character } from '../types/character.types';

export function formatCharacterDetails(character: Character) {
  return Object.entries(character)
    .filter(
      ([, value]) =>
        value !== null && value !== undefined && !Array.isArray(value)
    )
    .map(([name, value]) => `${name}: ${value ?? ''}`)
    .join('; ');
}
