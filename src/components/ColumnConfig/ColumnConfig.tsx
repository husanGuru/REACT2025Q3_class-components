import { COLUMNS } from 'src/utils/const';

import styles from './ColumnConfig.module.css';
import useColumns from 'src/store/columns';
import { ModalRef } from 'src/types/modal.types';

interface ColumnConfigProps {
  modalRef: React.RefObject<ModalRef | null>;
}

export default function ColumnConfig({ modalRef }: ColumnConfigProps) {
  const { columns, updateColumns } = useColumns();

  return (
    <div className={styles.config}>
      <select
        name="config"
        id="config"
        multiple
        value={columns}
        onChange={(e) => {
          const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );

          updateColumns(value);
        }}
      >
        {COLUMNS.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          modalRef.current?.close();
        }}
      >
        Confirm
      </button>
    </div>
  );
}
