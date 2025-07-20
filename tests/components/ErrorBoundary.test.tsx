import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../src/components/ErrorBoundary/ErrorBoundary';

const errorText = 'Test error';

function ProblemChild() {
  throw new Error(errorText);

  return null;
}

describe('ErrorBoundary', () => {
  it('should render fallback when child throws', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Custom fallback/i)).toBeInTheDocument();
  });

  it('should render default fallback if none is provided', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
