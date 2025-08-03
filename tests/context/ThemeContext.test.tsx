import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider, {
  ThemeContext,
} from '../../src/context/ThemeContext';

vi.mock('../hooks/useLocalStorage');

function TestConsumer() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div data-testid="theme">{theme}</div>
      <button onClick={toggleTheme}>Toggle</button>
    </>
  );
}

describe('ThemeContextProvider', () => {
  it('should provide default light theme and toggle correctly', async () => {
    const user = userEvent.setup();
    render(
      <ThemeContextProvider>
        <TestConsumer />
      </ThemeContextProvider>
    );

    const themeDiv = screen.getByTestId('theme');
    const toggleButton = screen.getByRole('button', { name: /toggle/i });

    // Initial value
    expect(themeDiv).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    // Toggle to dark
    await user.click(toggleButton);
    expect(themeDiv).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    // Toggle back to light
    await user.click(toggleButton);
    expect(themeDiv).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
