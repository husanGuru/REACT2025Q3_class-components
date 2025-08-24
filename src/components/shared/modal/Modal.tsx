import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ModalRef } from '../../../types/modal.types';
import useClickOutside from '../../../hooks/useClickOutside';

interface ModalProps {
  children: React.ReactNode;
  ref: React.Ref<ModalRef>;
}

export default function Modal({ children, ref }: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [open]);

  useClickOutside({ ref: modalContentRef, onClickOutside: handleModalClose });

  useImperativeHandle(ref, () => {
    return {
      open(e) {
        e.stopPropagation();
        setOpen(true);
        modalContentRef.current?.focus();
      },
      close() {
        setOpen(false);
      },
    };
  }, []);

  function handleModalClose() {
    if (open) {
      setOpen(false);
    }
  }

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalContentRef}>
        {children}
        <button className={styles.closeBtn} onClick={handleModalClose}>
          ✖
        </button>
      </div>
    </div>,
    document.body
  );
}
