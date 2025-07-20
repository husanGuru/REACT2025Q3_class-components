import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '../../src/components/Search/Search';

describe('Search', () => {
  const setup = async (value = '') => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Search onChange={onChange} value={value} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    return { user, input, button, onChange };
  };

  it('should render search input and search button', async () => {
    const { input, button } = await setup();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display initial value from props', async () => {
    const searchTerm = 'initial search';
    const { input } = await setup(searchTerm);
    expect((input as HTMLInputElement).value).toBe(searchTerm);
  });

  it('should show empty input when no saved term exists', () => {
    render(<Search onChange={() => {}} value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should update input value when user types', async () => {
    const { user, input } = await setup();
    const userInput = 'test input';

    await user.type(input, userInput);

    expect((input as HTMLInputElement).value).toBe(userInput);
  });

  it('should call onChange with current input value when search button is clicked', async () => {
    const { user, input, button, onChange } = await setup('initial');

    await user.clear(input);
    await user.type(input, 'updated search');
    await user.click(button);

    expect(onChange).toHaveBeenCalledWith('updated search');
  });
});
