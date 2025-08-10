import { Character } from '../types/character.type';

export function formatCharacterDetails(character: Character) {
  return Object.entries(character)
    .filter(
      ([, value]) =>
        value !== null && value !== undefined && !Array.isArray(value)
    )
    .map(([name, value]) => `${name}: ${value ?? ''}`)
    .join('; ');
}
