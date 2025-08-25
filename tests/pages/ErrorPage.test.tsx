import { render, screen } from '@testing-library/react';
import { useRouteError } from 'react-router';
import { Mock } from 'vitest';

import ErrorPage from '../../src/pages/Error/ErrorPage';

// Mock the `useRouteError` hook
vi.mock('react-router', () => ({
  useRouteError: vi.fn(),
  isRouteErrorResponse: (error: unknown) =>
    typeof error === 'object' && error !== null && 'status' in error,
}));

describe('ErrorPage Component', () => {
  it('renders default error message when no error is provided', () => {
    (useRouteError as Mock).mockReturnValue(null);

    render(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: 'Error occured' })
    ).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders 500 error message', () => {
    (useRouteError as Mock).mockReturnValue({
      status: 500,
      data: { message: 'Internal Server Error' },
    });

    render(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: 'Error occured' })
    ).toBeInTheDocument();
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
  });

  it('renders 404 error message', () => {
    (useRouteError as Mock).mockReturnValue({
      status: 404,
    });

    render(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: 'Not found!' })
    ).toBeInTheDocument();
    expect(screen.getByText('Could not find resource')).toBeInTheDocument();
  });

  it('renders error message for generic Error instance', () => {
    (useRouteError as Mock).mockReturnValue(
      new Error('Something bad happened')
    );

    render(<ErrorPage />);

    expect(
      screen.getByRole('heading', { name: 'Error occured' })
    ).toBeInTheDocument();
    expect(screen.getByText('Something bad happened')).toBeInTheDocument();
  });

  it('logs the error to the console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const error = new Error('Test error');
    (useRouteError as Mock).mockReturnValue(error);

    render(<ErrorPage />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    consoleErrorSpy.mockRestore();
  });
});
