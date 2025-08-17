import { PAGE_LIMIT } from '../const';
import { StartrekData, StartrekSingleData } from './startrek.types';

const BASE_URL = `https://stapi.co/api/v1/rest/character`;

interface getCharactersOptions {
  searchTerm?: string;
  page?: number;
  signal?: AbortSignal;
}

export async function getCharacters({
  searchTerm = '',
  page = 0,
  signal,
}: getCharactersOptions): Promise<StartrekData> {
  const body = new URLSearchParams({ name: searchTerm }).toString();

  const response = await fetch(
    `${BASE_URL}/search?pageNumber=${page}&pageSize=${PAGE_LIMIT}`,
    {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getCharacterById(
  id: string,
  signal?: AbortSignal
): Promise<StartrekSingleData> {
  const response = await fetch(`${BASE_URL}?uid=${id}`, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
