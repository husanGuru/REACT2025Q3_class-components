import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModalRef } from '../../../src/types/modal.types';
import React, { useRef } from 'react';
import { Modal } from '../../../src/components/shared';

describe('<Modal />', () => {
  it('opens and closes via ref', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const modalRef = useRef<ModalRef>(null);
      return (
        <>
          <button onClick={(e) => modalRef.current?.open(e)}>Open Modal</button>
          <Modal ref={modalRef}>
            <p>Modal content</p>
          </Modal>
        </>
      );
    };

    render(<TestComponent />);

    // Modal should not be in the document initially
    expect(screen.queryByRole('dialog')).toBeNull();

    // Open via button (imperative handle)
    await user.click(screen.getByRole('button', { name: /open modal/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();

    // Close via Escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes when clicking outside', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const modalRef = useRef<ModalRef>(null);
      return (
        <>
          <button>Outside Button</button>
          <Modal ref={modalRef}>
            <p>Modal content</p>
          </Modal>
          <button onClick={(e) => modalRef.current?.open(e)}>Open Modal</button>
        </>
      );
    };

    render(<TestComponent />);
    const openButton = screen.getByRole('button', { name: /open modal/i });

    // Open modal
    await user.click(openButton);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByRole('button', { name: /outside button/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes when clicking close button', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const modalRef = useRef<ModalRef>(null);
      return (
        <>
          <button onClick={(e) => modalRef.current?.open(e)}>Open Modal</button>
          <Modal ref={modalRef}>
            <p>Modal content</p>
          </Modal>
        </>
      );
    };

    render(<TestComponent />);

    // Open modal
    await user.click(screen.getByRole('button', { name: /open modal/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click close button inside modal
    const closeButton = screen.getByRole('button', { name: '✖' });
    await user.click(closeButton);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
