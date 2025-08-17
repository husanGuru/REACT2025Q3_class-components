'use client';

import ErrorResult from '@/components/ErrorResult/ErrorResult';
import useCharacter from '@/hooks/useCharacter';
import useClickOutside from '@/hooks/useClickOutside';
import { Link, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useRef } from 'react';

import styles from './page.module.css';
import { formatCharacterDetails } from '@/utils/character';
import { useTranslations } from 'next-intl';

export default function CharacterPage() {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations();

  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('characterId') ?? '';

  const page = parseInt(searchParams.get('page') || '1');

  const { character, isLoading, error } = useCharacter(id);

  useClickOutside({
    ref: panelRef,
    onClickOutside: handleClickOutside,
  });

  function handleClickOutside() {
    router.push(`/?page=${page}`);
  }

  if (!id) {
    return;
  }

  return (
    <div className={styles.characterWrapper} ref={panelRef}>
      {error ? (
        <ErrorResult error={error} />
      ) : isLoading ? (
        <div>{t('Loading')}</div>
      ) : (
        character && (
          <>
            <h2>{t('Character details', { character: character.name })}</h2>
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
