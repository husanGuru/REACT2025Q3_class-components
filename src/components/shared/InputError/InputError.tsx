import styles from './InputError.module.css';

export default function InputError({ error }: { error?: string }) {
  return <p className={styles.error}>{error}</p>;
}
