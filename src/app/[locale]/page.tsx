'use client';

import { useCallback } from 'react';
import styles from './page.module.css';
import useCharacters from '@/hooks/useCharacters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';

import Search from '@/components/Search/Search';
import ErrorResult from '@/components/ErrorResult/ErrorResult';
import Loading from '@/components/Loading/Loading';
import Result from '@/components/Result/Result';
import TotalSelected from '@/components/TotalSelected/TotalSelected';
import Pagination from '@/components/Pagination/Pagination';

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const [searchTerm, setSearchTerm] = useLocalStorage({
    key: 'search',
    initialValue: '',
  });

  const { isLoading, characters, totalPages, error } = useCharacters({
    searchTerm,
    page,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0) {
        router.push(
          pathname + '?' + createQueryString('page', newPage.toString())
        );
      }
    },
    [createQueryString, pathname, router]
  );

  function handleSearchChange(newTerm: string) {
    handlePageChange(1);
    setSearchTerm(newTerm.trim());
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainPage}>
        <Search onChange={handleSearchChange} value={searchTerm} />

        {error ? (
          <ErrorResult error={error} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <Result characters={characters} page={page} />
            <TotalSelected />
          </>
        )}
        {totalPages && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
