import { getSearch, setSearch } from '../src/utils/storage';

describe('storage utility', () => {
  const TOKEN = 'search';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty string if nothing is stored', () => {
    expect(getSearch()).toBe('');
  });

  it('should store and retrieve search term correctly', () => {
    setSearch('Picard');
    expect(localStorage.getItem(TOKEN)).toBe('Picard');
    expect(getSearch()).toBe('Picard');
  });

  it('should overwrite previous value', () => {
    setSearch('Spock');
    setSearch('Janeway');
    expect(getSearch()).toBe('Janeway');
  });
});
