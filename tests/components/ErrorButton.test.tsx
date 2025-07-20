import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from 'react';

import ErrorButton from '../../src/components/ErrorButton/ErrorButton';

// Mock Error Boundary to catch the thrown error
class MockErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Boundary caught an error</div>;
    }

    return this.props.children;
  }
}

describe('ErrorButton', () => {
  it('should render error button', () => {
    render(
      <MockErrorBoundary>
        <ErrorButton />
      </MockErrorBoundary>
    );
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  it('should throw error on click', async () => {
    const user = userEvent.setup();

    render(
      <MockErrorBoundary>
        <ErrorButton />
      </MockErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /throw error/i }));

    expect(screen.getByText(/boundary caught an error/i)).toBeInTheDocument();
  });
});
