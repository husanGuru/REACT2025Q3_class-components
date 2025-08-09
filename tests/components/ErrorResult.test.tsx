import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ErrorResult from '../../src/components/ErrorResult/ErrorResult';

describe('ErrorResult', () => {
  it('should render provided error', () => {
    const errorMessage = 'Some error';
    const error = new Error(errorMessage);

    render(<ErrorResult error={error} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
