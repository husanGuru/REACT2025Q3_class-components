import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('should render App component', () => {
    render(<App />);

    expect(true).toBeTruthy();
  });
});
