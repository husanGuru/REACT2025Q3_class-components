import { Character } from '../types/character.types';

export interface StartrekData {
  page: {
    totalPages: number;
  };
  characters: Character[];
}

export interface StartrekSingleData {
  character: Character;
}
