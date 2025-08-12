import { useCallback } from 'react';
import Search from '../components/Search/Search';
import ErrorResult from '../components/ErrorResult/ErrorResult';
import Loading from '../components/Loading/Loading';
import Result from '../components/Result/Result';
import { Outlet, useSearchParams } from 'react-router';
import Pagination from '../components/Pagination/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';

import styles from './page.module.css';
import TotalSelected from '../components/TotalSelected/TotalSelected';
import useCharacters from '../hooks/useCharacters';
import { useQueryClient } from '@tanstack/react-query';

export default function MainPage() {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const [searchTerm, setSearchTerm] = useLocalStorage({
    key: 'search',
    initialValue: '',
  });

  const { isLoading, characters, totalPages, error, refetch } = useCharacters({
    searchTerm,
    page,
  });

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0) {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        setSearchParams(params);
      }
    },
    [setSearchParams]
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
        <button
          onClick={() => {
            queryClient.clear();
            refetch();
          }}
          className={styles.clearBtn}
        >
          Clear cache and refetch
        </button>
      </div>
      <Outlet />
    </div>
  );
}
