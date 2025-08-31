import { useRef } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onChange: (v: string) => void;
}
export default function Search({ onChange }: SearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.search}>
      <input type="text" name="search" id="search" ref={ref} />
      <button
        onClick={() => {
          onChange(ref.current?.value ?? '');
        }}
      >
        Search
      </button>
    </div>
  );
}
