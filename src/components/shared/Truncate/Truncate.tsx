import { memo } from 'react';
import styles from './Truncate.module.css';

const Truncate = memo(function Truncate({ text }: { text: string | number }) {
  return <p className={styles.truncate}>{text}</p>;
});

export default Truncate;
