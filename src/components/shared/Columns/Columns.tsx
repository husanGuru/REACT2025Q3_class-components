import Truncate from '../Truncate/Truncate';
import styles from './Columns.module.css';

interface ColumnsProps {
  columns: string[];
}
export default function Columns({ columns }: ColumnsProps) {
  return (
    <div className={styles.columns}>
      {columns.map((column) => (
        <div key={column}>
          <Truncate text={column} />
        </div>
      ))}
    </div>
  );
}
