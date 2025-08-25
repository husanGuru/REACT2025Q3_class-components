import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { FormFields } from '../../src/types/form.types';
import Form from '../../src/components/Form/Form';
import { CountriesStore } from '../../src/store/countries';

// ---- Mock zustand stores ----
vi.mock('../../src/store/countries', () => {
  const useCountries = (selector: (state: CountriesStore) => unknown) =>
    selector({ countries: [{ value: 'uz', name: 'Uzbekistan' }] });
  return { default: useCountries };
});

type FormStore = {
  form: FormFields | null;
  updateForm: (f: FormFields) => void;
};
const updateFormMock = vi.fn();
vi.mock('../../src/store/form', () => {
  const useFormStore = (selector: (state: FormStore) => unknown) =>
    selector({ form: null, updateForm: updateFormMock });
  return { default: useFormStore };
});

// ---- Mock FileReader + URL.createObjectURL ----
class MockFileReader {
  result: string | null = null;
  onloadend: (() => void) | null = null;

  readAsDataURL(): void {
    this.result = 'data:image/png;base64,mock';
    if (this.onloadend) this.onloadend();
  }
}

Object.defineProperty(global, 'FileReader', {
  writable: true,
  value: MockFileReader,
});
Object.defineProperty(global.URL, 'createObjectURL', {
  writable: true,
  value: vi.fn(() => 'blob:mock-url'),
});

describe('Form component', () => {
  it('shows validation errors for invalid input', async () => {
    const handleSubmit = vi.fn();
    render(<Form onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/Name must start with an uppercase/)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Enter number/)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must be at least/)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/You must accept the terms/)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Upload the image/)).toBeInTheDocument();
    expect(await screen.findByText(/Choose the country/)).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits form when all fields are valid', async () => {
    const handleSubmit = vi.fn();
    render(<Form onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/Enter you name/i), 'John');
    await userEvent.type(screen.getByLabelText(/Enter you age/i), '30');
    await userEvent.type(
      screen.getByLabelText(/Enter you email/i),
      'test@example.com'
    );
    await userEvent.type(
      screen.getByLabelText(/^Enter password/i),
      'StrongP@ss1'
    );
    await userEvent.type(
      screen.getByLabelText(/Confirm password/i),
      'StrongP@ss1'
    );

    await userEvent.click(screen.getByRole('radio', { name: /female/i }));
    await userEvent.click(screen.getByLabelText(/Terms and Conditions/i));

    const file = new File(['img'], 'avatar.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(
      /Upload your picture/i
    ) as HTMLInputElement;
    await userEvent.upload(fileInput, file);

    await userEvent.type(
      screen.getByLabelText(/Select your country/i),
      'Uzbekistan'
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
    expect(updateFormMock).toHaveBeenCalled();
  });

  it('shows password mismatch error', async () => {
    render(<Form onSubmit={() => {}} />);

    await userEvent.type(
      screen.getByLabelText(/^Enter password/i),
      'StrongP@ss1'
    );
    await userEvent.type(
      screen.getByLabelText(/Confirm password/i),
      'WrongPass1'
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/Passwords do not match/)
    ).toBeInTheDocument();
  });
});
