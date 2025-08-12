import { Link } from 'react-router';
import { Character } from '../../types/character.types';

import styles from './Result.module.css';
import useSelectedCharacters from '../../store/selectedCharacters';

interface ResultItemProps {
  character: Character;
  page: number;
}

export default function ResultItem({ character, page }: ResultItemProps) {
  const { selectedCharacters, updateSelectedCharacters } =
    useSelectedCharacters();
  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        name={character.uid}
        id={character.uid}
        checked={selectedCharacters.some((ch) => ch.uid === character.uid)}
        onChange={() => updateSelectedCharacters(character)}
      />
      <Link key={character.uid} to={`/character/${character.uid}?page=${page}`}>
        <div className={styles.itemName}>{character.name}</div>
      </Link>
    </div>
  );
}
