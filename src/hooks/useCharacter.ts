import { getCharacterById } from '@/utils/api/startrek';
import { StartrekSingleData } from '@/utils/api/startrek.types';
import { useQuery } from '@tanstack/react-query';

export default function useCharacter(id: string | undefined) {
  const { isLoading, data, error } = useQuery<StartrekSingleData>({
    queryKey: ['get character', id],
    queryFn: ({ signal }) => getCharacterById(id as string, signal),
    enabled: Boolean(id),
  });

  return {
    isLoading,
    character: data?.character,
    error,
  };
}
