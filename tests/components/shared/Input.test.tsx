import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../../../src/components/shared';

describe('Input Component', () => {
  it('renders the input field', () => {
    render(<Input label="Test Input" name="test" />);
    expect(
      screen.getByRole('textbox', { name: 'Test Input' })
    ).toBeInTheDocument();
  });

  it('updates value on user input', async () => {
    render(<Input label="Test Input" name="test" />);
    const input = screen.getByRole('textbox', { name: 'Test Input' });
    await userEvent.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });
});
