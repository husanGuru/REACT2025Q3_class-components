import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { createMemoryRouter } from 'react-router';
import router from '../../src/routes'; // your router

describe('App Router', () => {
  it('renders MainPage on /', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'], // start at "/"
    });

    render(<RouterProvider router={testRouter} />);

    expect(screen.getByText(/uncontrolled form/i)).toBeInTheDocument();
    expect(
      screen.getByText('controlled form (react-hook-form)')
    ).toBeInTheDocument();
  });

  it('renders ErrorPage on wrong path', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/wrong-path'], // non-existent route
    });

    render(<RouterProvider router={testRouter} />);

    expect(
      screen.getByText(/Could not find resource/i) // adapt to your ErrorPage text
    ).toBeInTheDocument();
  });
});
