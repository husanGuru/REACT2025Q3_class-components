import useSort from 'src/store/sort';
import Truncate from '../Truncate/Truncate';
import styles from './Columns.module.css';

interface ColumnsProps {
  columns: string[];
}
export default function Columns({ columns }: ColumnsProps) {
  const { sort, updateSort } = useSort();

  return (
    <div className={styles.columns}>
      {columns.map((column) =>
        column === 'name' ? (
          <div
            key={column}
            onClick={() => {
              updateSort();
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            {`${sort ? (sort === 'asc' ? '⬆' : '⬇') : ''} ${column} (sortable)`}
          </div>
        ) : (
          <div key={column}>
            <Truncate text={column} />
          </div>
        )
      )}
    </div>
  );
}
