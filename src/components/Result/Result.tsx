import React from 'react';
import type { Character } from '../../types/character.type';

interface ResultProps {
  characters: Character[];
}

export default function Result({ characters }: ResultProps) {
  return (
    <div>
      {characters.map((character) => (
        <div key={character.uid}>{character.name}</div>
      ))}
    </div>
  );
}
