const BASE_URL = `https://stapi.co/api/v1/rest/character/search`;

export async function getCharacters(searchTerm: string) {
  const body = new URLSearchParams({ name: searchTerm }).toString();

  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
}
