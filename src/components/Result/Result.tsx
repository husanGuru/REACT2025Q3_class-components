import React from 'react';
import type { Character } from '../../types/character.type';

import styles from './Result.module.css';

interface ResultProps {
  characters: Character[];
}

export default function Result({ characters }: ResultProps) {
  return (
    <div className={styles.result}>
      {characters.map((character) => (
        <div key={character.uid} className={styles.item}>
          <div className={styles.itemName}>{character.name}</div>
          <div className={styles.itemDescription}>
            {Object.entries(character)
              .filter(([, value]) => value !== null && value !== undefined)
              .map(([name, value]) => `${name}: ${value ?? ''}`)
              .join('; ')}
          </div>
        </div>
      ))}
    </div>
  );
}
