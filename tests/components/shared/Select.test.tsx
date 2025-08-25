import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../../../src/components/shared';

describe('Select Component', () => {
  it('renders the select dropdown', () => {
    render(
      <Select
        label="Test Select"
        name="test"
        options={[
          { name: 'Option 1', value: 'Option 1' },
          { name: 'Option 2', value: 'Option 2' },
        ]}
      />
    );
    expect(
      screen.getByRole('combobox', { name: 'Test Select' })
    ).toBeInTheDocument();
  });

  it('allows entering an option', async () => {
    render(
      <Select
        label="Test Select"
        name="test"
        options={[
          { name: 'Option 1', value: 'Option 1' },
          { name: 'Option 2', value: 'Option 2' },
        ]}
      />
    );
    const select = screen.getByRole('combobox', { name: 'Test Select' });
    await userEvent.type(select, 'Option 1');
    expect(select).toHaveValue('Option 1');
  });
});
