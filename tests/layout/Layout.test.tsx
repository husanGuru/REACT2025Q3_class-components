import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import Layout from '../../src/layout/Layout';

describe('Layout', () => {
  it('renders Navigation and outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Outlet content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Check that Navigation renders
    expect(
      screen.getByRole('link', { name: /main page/i })
    ).toBeInTheDocument();

    // Check that Outlet renders provided children
    expect(screen.getByText(/outlet content/i)).toBeInTheDocument();
  });
});
