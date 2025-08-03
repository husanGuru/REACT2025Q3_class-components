import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import styles from './ThemeToggler.module.css';

export default function ThemeToggler() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div>
      <input
        type="checkbox"
        id="theme-toggle"
        aria-label="theme toggle"
        className={styles.input}
        onChange={() => toggleTheme()}
        checked={theme === 'dark'}
      />
      <label htmlFor="theme-toggle" className={styles.label}>
        <span className={`${styles.icon} ${styles.sun}`}>☀️</span>
        <span className={`${styles.icon} ${styles.moon}`}>🌙</span>
      </label>
    </div>
  );
}
