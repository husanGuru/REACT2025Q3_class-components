import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../api/startrek';

interface UseCharactersProps {
  searchTerm: string;
  page: number;
}

export default function useCharacters({
  searchTerm,
  page,
}: UseCharactersProps) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['get characters', page, searchTerm],
    queryFn: () => getCharacters({ searchTerm, page: page - 1 }),
    retry: 1,
  });

  return {
    isLoading,
    characters: data?.characters ?? [],
    totalPages: data?.page.totalPages,
    error,
  };
}
