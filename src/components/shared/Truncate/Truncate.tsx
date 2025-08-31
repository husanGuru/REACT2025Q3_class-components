import styles from './Truncate.module.css';

export default function Truncate({ text }: { text: string | number }) {
  return <p className={styles.truncate}>{text}</p>;
}
