import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useRef } from 'react';
import useClickOutside from '../../src/hooks/useClickOutside';

function TestComponent({ onClickOutside }: { onClickOutside: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside({ ref, onClickOutside });

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  it('calls onClickOutside when clicking outside the ref element', async () => {
    const handleClickOutside = vi.fn();
    render(<TestComponent onClickOutside={handleClickOutside} />);

    await userEvent.click(screen.getByTestId('outside'));

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  it('does not call onClickOutside when clicking inside the ref element', async () => {
    const handleClickOutside = vi.fn();
    render(<TestComponent onClickOutside={handleClickOutside} />);

    await userEvent.click(screen.getByTestId('inside'));

    expect(handleClickOutside).not.toHaveBeenCalled();
  });

  it('removes listener on unmount', async () => {
    const handleClickOutside = vi.fn();
    const { unmount } = render(
      <TestComponent onClickOutside={handleClickOutside} />
    );

    unmount();

    await userEvent.click(document.body);
    expect(handleClickOutside).not.toHaveBeenCalled();
  });
});
