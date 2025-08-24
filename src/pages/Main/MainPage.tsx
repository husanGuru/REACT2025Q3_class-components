import { useRef } from 'react';
import { ModalRef } from '../../types/modal.types';
import FormUncontrolled from '../../components/FormUncontrolled/FormUncontrolled';
import Form from '../../components/Form/Form';
import { Modal } from '../../components/shared';
import FormResult from '../../components/FormResult/FormResult';

import styles from './page.module.css';
import useFormStore from '../../store/form';
import useFormUncontrolledStore from '../../store/formUncontrolled';

export default function MainPage() {
  const modalRefUncontrolled = useRef<ModalRef>(null);
  const modalRefControlled = useRef<ModalRef>(null);

  const formControlledData = useFormStore((selector) => selector.form);
  const formUnControlledData = useFormUncontrolledStore(
    (selector) => selector.form
  );

  const isformControlledNew = useFormStore((selector) => selector.isNew);
  const isformUnControlledNew = useFormUncontrolledStore(
    (selector) => selector.isNew
  );

  return (
    <div>
      <div className={styles.btnWrapper}>
        <button
          onClick={(e) => modalRefUncontrolled.current?.open(e)}
          className={styles.btn}
        >
          uncontrolled form
        </button>
        <button
          onClick={(e) => modalRefControlled.current?.open(e)}
          className={styles.btn}
        >
          controlled form (react-hook-form)
        </button>
      </div>

      <div className={styles.result}>
        <FormResult
          data={formUnControlledData}
          isNew={isformUnControlledNew}
          title="Uncontrolled form result"
        />
        <FormResult
          data={formControlledData}
          isNew={isformControlledNew}
          title="Controlled form result"
        />
      </div>

      <Modal ref={modalRefUncontrolled}>
        <FormUncontrolled
          onSubmit={() => modalRefUncontrolled.current?.close()}
        />
      </Modal>
      <Modal ref={modalRefControlled}>
        <Form onSubmit={() => modalRefControlled.current?.close()} />
      </Modal>
    </div>
  );
}
