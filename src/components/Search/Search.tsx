import { useState, type ChangeEvent } from 'react';

import styles from './Search.module.css';

interface SearchProps {
  onChange: (searchTerm: string) => void;
  value: string;
}

export default function Search({ onChange, value }: SearchProps) {
  const [inputValue, setInputValue] = useState(value ?? '');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter search text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className={styles.btn} onClick={() => onChange(inputValue)}>
        Search
      </button>
    </div>
  );
}
