import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../api/startrek';
import { StartrekData } from '../api/startrek.types';

interface UseCharactersProps {
  searchTerm: string;
  page: number;
}

export default function useCharacters({
  searchTerm,
  page,
}: UseCharactersProps) {
  const { isLoading, data, error } = useQuery<StartrekData>({
    queryKey: ['get characters', page, searchTerm],
    queryFn: ({ signal }) =>
      getCharacters({ searchTerm, page: page - 1, signal }),
  });

  return {
    isLoading,
    characters: data?.characters ?? [],
    totalPages: data?.page.totalPages,
    error,
  };
}
