import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../../../src/components/shared/Checkbox/Checkbox';

describe('Checkbox Component', () => {
  it('renders the checkbox', () => {
    render(<Checkbox label="Test Checkbox" name="test" />);
    expect(
      screen.getByRole('checkbox', { name: /Test Checkbox/i })
    ).toBeInTheDocument();
  });

  it('toggles the checkbox when clicked', async () => {
    render(<Checkbox label="Test Checkbox" name="test" />);
    const checkbox = screen.getByRole('checkbox', { name: /Test Checkbox/i });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
