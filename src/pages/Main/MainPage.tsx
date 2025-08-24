import { useRef } from 'react';
import Modal from '../../components/shared/modal/Modal';
import { ModalRef } from '../../types/modal.types';

export default function MainPage() {
  const modalRef1 = useRef<ModalRef>(null);
  const modalRef2 = useRef<ModalRef>(null);

  return (
    <div>
      <button onClick={(e) => modalRef1.current?.open(e)}>
        uncontrolled form
      </button>
      <button onClick={(e) => modalRef2.current?.open(e)}>
        react hook form
      </button>
      <Modal ref={modalRef1}>uncontrolled form</Modal>
      <Modal ref={modalRef2}>react hook form</Modal>
    </div>
  );
}
