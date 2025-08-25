import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';
import FormUncontrolled from '../../src/components/FormUncontrolled/FormUncontrolled';
import useFormUncontrolledStore from '../../src/store/formUncontrolled';
import { CountriesStore } from '../../src/store/countries';

// Mock Zustand store
vi.mock('../../store/formUncontrolled', () => {
  return {
    __esModule: true,
    default: vi.fn((selector) => {
      const state = {
        form: {
          name: '',
          age: undefined,
          email: '',
          password: '',
          confirmPassword: '',
          gender: '',
          terms: false,
          image: null,
          country: '',
          imageBase64: '',
        },
        updateForm: vi.fn(),
      };
      return selector(state);
    }),
  };
});

// Mock countries store
vi.mock('../../src/store/countries', () => {
  const useCountries = (selector: (state: CountriesStore) => unknown) =>
    selector({ countries: [{ value: 'uzb', name: 'Uzbekistan' }] });
  return { default: useCountries };
});

describe('FormUncontrolled', () => {
  it('shows validation errors when submitting empty form', async () => {
    const handleSubmit = vi.fn();
    render(<FormUncontrolled onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      // these are your validation messages coming from zod
      expect(screen.getByText(/enter you name/i)).toBeInTheDocument();
      expect(screen.getByText(/enter you email/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits when all fields are valid', async () => {
    const handleSubmit = vi.fn();
    render(<FormUncontrolled onSubmit={handleSubmit} />);

    await userEvent.type(
      screen.getByRole('textbox', { name: /enter you name/i }),
      'John Doe'
    );
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /enter you age/i }),
      '30'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: /enter you email/i }),
      'john@example.com'
    );
    await userEvent.type(screen.getByLabelText(/enter password/i), '123456');
    await userEvent.type(screen.getByLabelText(/confirm password/i), '123456');

    await userEvent.click(screen.getByRole('radio', { name: /female/i }));
    await userEvent.click(screen.getByRole('checkbox', { name: /terms/i }));

    await userEvent.type(
      screen.getByLabelText(/Select your country/i),
      'Uzbekistan'
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });

    const store = useFormUncontrolledStore as unknown as Mock;
    expect(store().updateForm).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        password: '123456',
        confirmPassword: '123456',
        gender: 'male',
        terms: true,
        country: 'uz',
      })
    );
  });
});
