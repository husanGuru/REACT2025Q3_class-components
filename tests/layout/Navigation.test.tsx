import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Navigation from '../../src/layout/Navigation';

describe('Navigation', () => {
  it('renders a link to main page', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
