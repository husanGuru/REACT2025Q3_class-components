import { useRef } from 'react';
import { useSearchParams, Link, useParams } from 'react-router';

import styles from './page.module.css';
import ErrorResult from '../components/ErrorResult/ErrorResult';
import useCharacter from '../hooks/useCharacter';
import useClickOutside from '../hooks/useClickOutside';
import { formatCharacterDetails } from '../utils/character';

export default function CharacterPage() {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { character, isLoading, error } = useCharacter(id);

  useClickOutside({ ref: panelRef, link: `/?page=${page}` });

  return (
    <div className={styles.characterWrapper} ref={panelRef}>
      {error ? (
        <ErrorResult error={error} />
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        character && (
          <>
            <h2>Character {character.name} details:</h2>
            <div className={styles.itemDescription}>
              {formatCharacterDetails(character)}
            </div>
          </>
        )
      )}
      <Link to={`/?page=${page}`} className={styles.closeBtn}>
        X
      </Link>
    </div>
  );
}
