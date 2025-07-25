import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter, RouteObject } from 'react-router';
import { describe, it, expect } from 'vitest';
import ErrorPage from '../../src/pages/ErrorPage';

// Simulate 404 by navigating to a non-existent route
describe('ErrorPage', () => {
  it('renders 404 route error', async () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <div>Home</div>,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'valid',
            element: <div>Valid Page</div>,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/non-existent'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/Not found!/i)).toBeInTheDocument();
    expect(screen.getByText(/Could not find resource/i)).toBeInTheDocument();
  });

  it('renders 500 error from loader', async () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <div>Home</div>,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'boom',
            loader: () => {
              throw new Response('Server Error', {
                status: 500,
                statusText: 'Internal Server Error',
              });
            },
            element: <div>Broken Page</div>,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/boom'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/Error occured/i)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
  });

  it('renders generic error from thrown Error instance', async () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <div>Home</div>,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'throw-error',
            loader: () => {
              throw new Error('This is a JS error');
            },
            element: <div>Error Page</div>,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/throw-error'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/Error occured/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a JS error/i)).toBeInTheDocument();
  });
});
