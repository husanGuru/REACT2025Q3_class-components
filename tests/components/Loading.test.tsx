import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Loading from '../../src/components/Loading/Loading';

describe('Loading', () => {
  it('should render loading component', () => {
    render(<Loading />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
