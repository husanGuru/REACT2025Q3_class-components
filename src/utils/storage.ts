const TOKEN = 'search';
export function setSearch(searchTerm: string) {
  localStorage.setItem(TOKEN, searchTerm);
}
export function getSearch() {
  return localStorage.getItem(TOKEN) ?? '';
}
