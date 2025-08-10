import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const KEY = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value if localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: KEY, initialValue: 'default' })
    );

    expect(result.current[0]).toBe('default');
  });

  it('should load existing value from localStorage', () => {
    localStorage.setItem(KEY, JSON.stringify('stored'));
    const { result } = renderHook(() =>
      useLocalStorage({ key: KEY, initialValue: 'default' })
    );

    expect(result.current[0]).toBe('stored');
  });

  it('should update value and set localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: KEY, initialValue: 'initial' })
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('new-value'));
  });

  it('should fallback to initialValue if JSON.parse fails', () => {
    localStorage.setItem(KEY, '{invalid-json}');
    const { result } = renderHook(() =>
      useLocalStorage({ key: KEY, initialValue: 'safe-default' })
    );

    expect(result.current[0]).toBe('safe-default');
  });
});
