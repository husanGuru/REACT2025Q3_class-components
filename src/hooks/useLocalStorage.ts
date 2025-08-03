import { useState } from 'react';

interface UseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

export default function useLocalStorage<T>(
  props: UseLocalStorageProps<T>
): [T, (value: T | ((prev: T) => T)) => void] {
  const { key, initialValue } = props;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const valueToStore =
        typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;

      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [storedValue, setValue];
}
