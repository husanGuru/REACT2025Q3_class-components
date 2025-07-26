import { useCallback, useEffect, useState } from 'react';
import Search from '../components/Search/Search';
import ErrorResult from '../components/ErrorResult/ErrorResult';
import Loading from '../components/Loading/Loading';
import Result from '../components/Result/Result';
import { getCharacters } from '../api/startrek';
import { Link, Outlet, useSearchParams } from 'react-router';
import Pagination from '../components/Pagination/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';

import styles from './page.module.css';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const [searchTerm, setSearchTerm] = useLocalStorage({
    key: 'search',
    initialValue: '',
  });

  const [totalPages, setTotalPages] = useState();
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    async function fetchCharacters(searchTerm: string) {
      setIsLoading(true);

      try {
        const fetchedCharacters = await getCharacters({
          searchTerm,
          page: page - 1,
        });

        // if page number is greater than totalPages, set page=1
        if (page > fetchedCharacters.page.totalPages) {
          handlePageChange(1);
        }

        setTotalPages(fetchedCharacters.page.totalPages);
        setCharacters(fetchedCharacters.characters);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setIsLoading(false);
    }
    fetchCharacters(searchTerm);
  }, [searchTerm, page, handlePageChange]);

  function handleSearchChange(newTerm: string) {
    handlePageChange(1);
    setSearchTerm(newTerm.trim());
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainPage}>
        <Search onChange={handleSearchChange} value={searchTerm} />
        <Link to={'/about'}>About page</Link>
        {error ? (
          <ErrorResult error={error} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <Result characters={characters} page={page} />
        )}
        {totalPages && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
}
