import { useState } from 'react';

interface UseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

type UseLocalStorageType = <T>(
  props: UseLocalStorageProps<T>
) => [T, (val: T) => void];

const useLocalStorage: UseLocalStorageType = <T>({
  key,
  initialValue,
}: UseLocalStorageProps<T>) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setStorageValue(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, setStorageValue] as const;
};

export default useLocalStorage;
