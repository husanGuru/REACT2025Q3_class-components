import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../../../src/components/shared';

const options = [
  {
    value: 'male',
    name: 'male',
  },
];

const options2 = [
  {
    value: 'male',
    name: 'male',
  },
  {
    value: 'female',
    name: 'female',
  },
];

describe('Radio Component', () => {
  it('renders the radio button with the correct label', () => {
    render(
      <Radio
        label="Option 1"
        value="option1"
        name="test-radio"
        options={options}
      />
    );
    expect(
      screen.getByRole('radio', { name: options[0].name })
    ).toBeInTheDocument();
  });

  it('is not checked by default', () => {
    render(
      <Radio
        label="Option 1"
        value="option1"
        name="test-radio"
        options={options}
      />
    );
    const radio = screen.getByRole('radio', { name: options[0].name });
    expect(radio).not.toBeChecked();
  });

  it('becomes checked when clicked', async () => {
    render(
      <Radio
        label="Option 1"
        value="option1"
        name="test-radio"
        options={options}
      />
    );
    const radio = screen.getByRole('radio', { name: options[0].name });
    await userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it('calls the onChange handler when clicked', async () => {
    const handleChange = vi.fn();
    render(
      <Radio
        label="Option 1"
        value="option1"
        name="test-radio"
        onChange={handleChange}
        options={options}
      />
    );
    const radio = screen.getByRole('radio', { name: options[0].name });
    await userEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('allows only one radio button to be selected in a group', async () => {
    render(
      <>
        <Radio
          label="Option 2"
          value="option2"
          name="test-radio"
          options={options2}
        />
      </>
    );
    const radio1 = screen.getByRole('radio', { name: options2[0].name });
    const radio2 = screen.getByRole('radio', { name: options2[1].name });

    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    await userEvent.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });
});
