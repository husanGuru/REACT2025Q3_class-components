import { PAGE_LIMIT } from '../utils/const';

const BASE_URL = `https://stapi.co/api/v1/rest/character/search`;

interface getCharactersOptions {
  searchTerm?: string;
  page?: number;
}

export async function getCharacters({
  searchTerm = '',
  page = 0,
}: getCharactersOptions) {
  const body = new URLSearchParams({ name: searchTerm }).toString();

  const response = await fetch(
    `${BASE_URL}?pageNumber=${page}&pageSize=${PAGE_LIMIT}`,
    {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}
