import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeContext } from '../../src/context/ThemeContext';
import ThemeToggler from '../../src/components/ThemeToggler/ThemeToggler';

describe('ThemeToggler', () => {
  it('should render with light theme and toggle to dark on click', async () => {
    const toggleTheme = vi.fn();
    const user = userEvent.setup();

    render(
      <ThemeContext value={{ theme: 'light', toggleTheme }}>
        <ThemeToggler />
      </ThemeContext>
    );

    const checkbox = screen.getByRole('checkbox', { name: /theme toggle/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should show checkbox as checked when theme is dark', () => {
    const toggleTheme = vi.fn();

    render(
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
        <ThemeToggler />
      </ThemeContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox', { name: /theme toggle/i });
    expect(checkbox).toBeChecked();
  });
});
