import { Character } from '../types/character.type';

export interface StartrekData {
  page: {
    totalPages: number;
  };
  characters: Character[];
}
