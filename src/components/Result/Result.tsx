import { Link } from 'react-router';
import type { Character } from '../../types/character.type';

import styles from './Result.module.css';

interface ResultProps {
  characters: Character[];
  page: number;
}

export default function Result({ characters, page }: ResultProps) {
  if (!characters || characters.length === 0) {
    return <div className={styles.notFound}>Characters not found</div>;
  }
  return (
    <div className={styles.result}>
      {characters.map((character) => (
        <Link
          key={character.uid}
          className={styles.item}
          to={`/character/${character.uid}?page=${page}`}
        >
          <div className={styles.itemName}>{character.name}</div>
        </Link>
      ))}
    </div>
  );
}
