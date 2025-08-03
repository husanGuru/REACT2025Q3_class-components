import type { Character } from '../../types/character.type';

import styles from './Result.module.css';
import ResultItem from './ResultItem';

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
        <ResultItem character={character} page={page} key={character.uid} />
      ))}
    </div>
  );
}
