import useYear from 'src/store/year';
import styles from './Sort.module.css';

export default function Sort() {
  const selectedYear = useYear((selector) => selector.selectedYear);

  return <div className={styles.sort}>{selectedYear && <div></div>}</div>;
}
