import { getCharacters } from '@/utils/api/startrek';
import { StartrekData } from '@/utils/api/startrek.types';
import { useQuery } from '@tanstack/react-query';

interface UseCharactersProps {
  searchTerm: string;
  page: number;
}

export default function useCharacters({
  searchTerm,
  page,
}: UseCharactersProps) {
  const { isLoading, data, error, refetch } = useQuery<StartrekData>({
    queryKey: ['get characters', page, searchTerm],
    queryFn: ({ signal }) =>
      getCharacters({ searchTerm, page: page - 1, signal }),
  });

  return {
    isLoading,
    characters: data?.characters ?? [],
    totalPages: data?.page.totalPages,
    error,
    refetch,
  };
}
