'use client';

import ErrorResult from '@/components/ErrorResult/ErrorResult';
import useCharacter from '@/hooks/useCharacter';
import useClickOutside from '@/hooks/useClickOutside';
import { Link } from '@/i18n/navigation';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef } from 'react';

import styles from './page.module.css';
import { formatCharacterDetails } from '@/utils/character';

export default function CharacterPage() {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { character, isLoading, error } = useCharacter(id);

  useClickOutside({
    ref: panelRef,
    onClickOutside: handleClickOutside,
  });

  function handleClickOutside() {
    router.push(`/?page=${page}`);
  }

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
      <Link href={`/?page=${page}`} className={styles.closeBtn}>
        X
      </Link>
    </div>
  );
}
