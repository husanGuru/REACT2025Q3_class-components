import { render, screen } from '@testing-library/react';
import AboutPage from '../../src/pages/AboutPage';

describe('AboutPage', () => {
  it('renders heading and paragraph', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: /about author page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the author was in a bit of a hurry/i)
    ).toBeInTheDocument();
  });

  it('renders RS School link', () => {
    render(<AboutPage />);

    const link = screen.getByRole('link', { name: /rs school react course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
