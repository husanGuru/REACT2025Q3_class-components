import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Link, useParams } from 'react-router';

import styles from './page.module.css';
import { Character } from '../types/character.type';
import { getCharacterById } from '../api/startrek';
import ErrorResult from '../components/ErrorResult/ErrorResult';
import useClickOutside from '../hooks/useClickOutside';
import { formatCharacterDetails } from '../utils/character';

export default function CharacterPage() {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  useClickOutside({ ref: panelRef, link: `/?page=${page}` });

  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCharacter() {
      setIsLoading(true);
      try {
        if (id) {
          const response = await getCharacterById(id, signal);
          setCharacter(response.character);
        }
      } catch (error: unknown) {
        if (signal.aborted) {
          console.log('Request aborted');
        } else {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

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
