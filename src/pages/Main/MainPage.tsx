import { getCO2Data } from 'src/api/co2';
import ColumnConfig from 'src/components/ColumnConfig/ColumnConfig';
import Countries from 'src/components/Countries/Countries';
import { Modal } from 'src/components/shared';
import Loading from 'src/components/shared/Loading/Loading';
import { ModalRef } from 'src/types/modal.types';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useRef } from 'react';

import styles from './page.module.css';
import useColumns from 'src/store/columns';

export default function MainPage() {
  const modalRef = useRef<ModalRef>(null);

  const columns = useColumns((selector) => selector.columns);

  const query = useQuery({
    queryKey: ['co2-data'],
    queryFn: ({ signal }) => getCO2Data(signal),
  });

  return (
    <div>
      <div className={styles.columnConfig}>
        <button
          onClick={(e) => modalRef.current?.open(e)}
          className={styles.btn}
        >
          Configure columns
        </button>
        <div className={styles.columns}>
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
      </div>

      <Modal ref={modalRef}>
        <ColumnConfig modalRef={modalRef} />
      </Modal>
      <Suspense fallback={<Loading />}>
        <Countries query={query} />
      </Suspense>
    </div>
  );
}
