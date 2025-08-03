import { create } from 'zustand';
import { Character } from '../types/character.type';

interface SelectedCharactersStore {
  selectedCharacters: Character[];
  updateSelectedCharacters: (newCharacter: Character) => void;
  unselectAll: () => void;
}

const useSelectedCharacters = create<SelectedCharactersStore>((set, get) => ({
  selectedCharacters: [],
  updateSelectedCharacters: (newCharacter: Character) => {
    const current = get().selectedCharacters;
    if (current.some((ch) => ch.uid === newCharacter.uid)) {
      set({
        selectedCharacters: current.filter((ch) => ch.uid !== newCharacter.uid),
      });
    } else {
      set({ selectedCharacters: [...current, newCharacter] });
    }
  },
  unselectAll: () => {
    set({ selectedCharacters: [] });
  },
}));

export default useSelectedCharacters;
