import { useEffect, useState } from 'react';
import Search from '../components/Search/Search';
import ErrorResult from '../components/ErrorResult/ErrorResult';
import Loading from '../components/Loading/Loading';
import Result from '../components/Result/Result';
import { getSearch, setSearch } from '../utils/storage';
import { getCharacters } from '../api/startrek';
import { useSearchParams } from 'react-router';
import Pagination from '../components/Pagination/Pagination';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  console.log({ page });

  const [totalPages, setTotalPages] = useState();
  const [searchTerm, setSearchTerm] = useState(getSearch() ?? '');
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters(searchTerm: string) {
      setIsLoading(true);

      try {
        const fetchedCharacters = await getCharacters({
          searchTerm,
          page: page - 1,
        });

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
  }, [searchTerm, page]);

  function handleSearchChange(newTerm: string) {
    setSearchTerm(newTerm.trim());
    setSearch(newTerm.trim());
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  }

  return (
    <>
      <Search onChange={handleSearchChange} value={searchTerm} />

      {error ? (
        <ErrorResult error={error} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <Result characters={characters} />
          {totalPages && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}
