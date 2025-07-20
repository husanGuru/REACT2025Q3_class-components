import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '../../src/components/Search/Search';

const STORAGE_TOKEN = 'search';

describe('Search', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Search onChange={onChange} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    return { user, input, button, onChange };
  };

  it('should render search input and search button', async () => {
    const { input, button } = await setup();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display previously saved search term from localStorage on mount', async () => {
    const searchTerm = 'search term';
    localStorage.setItem(STORAGE_TOKEN, searchTerm);
    render(<Search onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(searchTerm);
  });

  it('should show empty input when no saved term exists', () => {
    render(<Search onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should update input value when user types', async () => {
    const { user, input } = await setup();
    const userInput = 'test input';

    await user.type(input, userInput);

    expect((input as HTMLInputElement).value).toBe(userInput);
  });

  it('should save search term to localStorage when search button is clicked', async () => {
    const { user, input, button } = await setup();
    const userInput = 'test input';

    await user.type(input, userInput);
    await user.click(button);

    expect(localStorage.getItem(STORAGE_TOKEN)).toBe(userInput);
  });

  it('should call onChange with empty string when input is empty', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Search onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(handleChange).toHaveBeenCalledWith('');
  });
});
