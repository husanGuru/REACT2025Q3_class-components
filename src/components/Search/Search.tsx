import { useState, type ChangeEvent } from 'react';

import styles from './Search.module.css';
import { useTranslations } from 'next-intl';

interface SearchProps {
  onChange: (searchTerm: string) => void;
  value: string;
}

export default function Search({ onChange, value }: SearchProps) {
  const t = useTranslations('MainPage');

  const [inputValue, setInputValue] = useState(value ?? '');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder={t('Enter search text')}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className={styles.btn} onClick={() => onChange(inputValue)}>
        {t('Search')}
      </button>
    </div>
  );
}
