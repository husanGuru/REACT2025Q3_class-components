import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import MainPage from '../../src/pages/Main/MainPage';

// ---- Mock Zustand stores ----
vi.mock('../../src/store/form', () => {
  return {
    __esModule: true,
    default: (selector: (s: unknown) => unknown) =>
      selector({ form: { name: 'Jane' }, isNew: true }),
  };
});
vi.mock('../../src/store/formUncontrolled', () => {
  return {
    __esModule: true,
    default: (selector: (s: unknown) => unknown) =>
      selector({ form: { name: 'John' }, isNew: false }),
  };
});

// ---- Mock Modal to simplify open/close ----
vi.mock('../../src/components/shared', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../src/components/shared')>();

  const Modal = vi
    .fn()
    .mockImplementation(({ children }: { children: React.ReactNode }) => (
      <div data-testid="modal">{children}</div>
    ));
  return { ...actual, Modal };
});

describe('MainPage', () => {
  it('renders buttons and form results', () => {
    render(<MainPage />);

    // Buttons exist
    expect(
      screen.getByRole('button', { name: 'uncontrolled form' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'controlled form (react-hook-form)' })
    ).toBeInTheDocument();

    // Form results from mocked store
    expect(screen.getByText(/Uncontrolled form result/i)).toBeInTheDocument();
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText('Controlled form result')).toBeInTheDocument();
    expect(screen.getByText(/Jane/)).toBeInTheDocument();
  });

  it('opens uncontrolled form modal on button click', async () => {
    render(<MainPage />);
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    // Since we mocked Modal, we check that it rendered its children
    expect(screen.getAllByTestId('modal')[0]).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /form uncontrolled/i })
    ).toBeInTheDocument();
  });

  it('opens controlled form modal on button click', async () => {
    render(<MainPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'uncontrolled form' }));

    expect(screen.getAllByTestId('modal')[1]).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /form controlled/i })
    ).toBeInTheDocument();
  });
});
