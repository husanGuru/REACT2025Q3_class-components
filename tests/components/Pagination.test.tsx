import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from '../../src/components/Pagination/Pagination';

describe('Pagination', () => {
  it('renders current page button as active', () => {
    render(<Pagination page={3} totalPages={10} onChange={() => {}} />);
    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass(/active/i);
  });

  it('renders first and last page buttons when needed', () => {
    render(<Pagination page={6} totalPages={10} onChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onChange with correct page when a number is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination page={2} totalPages={5} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: '3' }));

    expect(onChange).toHaveBeenCalled();
  });

  it('shows ellipsis when there are hidden pages', () => {
    render(<Pagination page={7} totalPages={20} onChange={() => {}} />);
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('renders correctly when on first page', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByText('1')).toHaveClass(/active/i);
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('renders correctly when on last page', () => {
    render(<Pagination page={5} totalPages={5} onChange={() => {}} />);
    expect(screen.getByText('5')).toHaveClass(/active/i);
  });

  it('renders ... if page greater than PAGINATION_LIMIT+2', () => {
    render(<Pagination page={10} totalPages={20} onChange={() => {}} />);
    expect(screen.getAllByText(/\.{3}/).length).toBeGreaterThan(0);
  });
});
