import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '../api/startrek';
import { StartrekSingleData } from '../api/startrek.types';

export default function useCharacter(id: string | undefined) {
  const { isLoading, data, error } = useQuery<StartrekSingleData>({
    queryKey: ['get character', id],
    queryFn: () => getCharacterById(id as string),
    enabled: Boolean(id),
  });

  return {
    isLoading,
    character: data?.character,
    error,
  };
}
