import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ErrorResult from '../../src/components/ErrorResult/ErrorResult';

describe('ErrorResult', () => {
  it('should render provided error', () => {
    const errorText = 'Some error';

    render(<ErrorResult error={errorText} />);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
