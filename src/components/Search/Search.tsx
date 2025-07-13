import { useRef } from 'react';

import styles from './Search.module.css';

interface SearchProps {
  onChange: (searchTerm: string) => void;
}
export default function Search({ onChange }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter search text"
        ref={inputRef}
      />
      <button
        className={styles.btn}
        onClick={() => onChange(inputRef.current?.value || '')}
      >
        Search
      </button>
    </div>
  );
}
