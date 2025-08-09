import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Link, useParams } from 'react-router';

import styles from './page.module.css';
import ErrorResult from '../components/ErrorResult/ErrorResult';
import useCharacter from '../hooks/useCharacter';

export default function CharacterPage() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { character, isLoading, error } = useCharacter(id);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        navigate(`/?page=${page}`); // close panel
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [page, navigate]);

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
              {Object.entries(character)
                .filter(
                  ([, value]) =>
                    value !== null &&
                    value !== undefined &&
                    !Array.isArray(value)
                )
                .map(([name, value]) => `${name}: ${value ?? ''}`)
                .join('; ')}
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
