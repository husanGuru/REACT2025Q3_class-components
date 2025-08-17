import useSelectedCharacters from '@/store/selectedCharacters';
import { Character } from '../../types/character.types';

import styles from './Result.module.css';
import { Link } from '@/i18n/navigation';

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
      <Link
        key={character.uid}
        href={`/?characterId=${character.uid}&page=${page}`}
      >
        <div className={styles.itemName}>{character.name}</div>
      </Link>
    </div>
  );
}
