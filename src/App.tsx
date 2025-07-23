import { useEffect, useState } from 'react';
import ErrorResult from './components/ErrorResult/ErrorResult';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Result from './components/Result/Result';
import Search from './components/Search/Search';
import { getSearch, setSearch } from './utils/storage';
import { getCharacters } from './api/startrek';

import Loading from './components/Loading/Loading';

function App() {
  const [searchTerm, setSearchTerm] = useState(getSearch() ?? '');
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters(searchTerm: string) {
      setIsLoading(true);

      try {
        const fetchedCharacters = await getCharacters(searchTerm);

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
  }, [searchTerm]);

  function handleSearchChange(newTerm: string) {
    setSearchTerm(newTerm.trim());
    setSearch(newTerm.trim());
  }

  return (
    <ErrorBoundary>
      <>
        {/* Assuming Search accepts onChange as a prop */}
        <Search onChange={handleSearchChange} value={searchTerm} />

        {error ? (
          <ErrorResult error={error} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <Result characters={characters} />
        )}
      </>
    </ErrorBoundary>
  );
}

export default App;
