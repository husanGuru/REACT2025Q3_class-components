import styles from './ErrorResult.module.css';

interface ErrorResultProps {
  error: Error;
}

export default function ErrorResult({ error }: ErrorResultProps) {
  return <div className={styles.error}>{error.message}</div>;
}
