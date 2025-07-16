import styles from './ErrorResult.module.css';

interface ErrorResultProps {
  error: string;
}

export default function ErrorResult({ error }: ErrorResultProps) {
  return <div className={styles.error}>{error}</div>;
}
