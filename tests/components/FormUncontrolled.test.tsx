import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FormUncontrolled from '../../src/components/FormUncontrolled/FormUncontrolled';
import { FormFields } from '../../src/types/form.types';
import { CountriesStore } from '../../src/store/countries';
import { mockFormData } from '../__mocks__/formData'; // adjust path if needed

// ---- Mock zustand stores ----
vi.mock('../../src/store/countries', () => {
  const useCountries = (selector: (state: CountriesStore) => unknown) =>
    selector({ countries: [{ value: 'uz', name: 'Uzbekistan' }] });
  return { default: useCountries };
});

type FormUncontrolledStore = {
  form: FormFields | null;
  updateForm: (f: FormFields) => void;
};
const updateFormMock = vi.fn();
vi.mock('../../src/store/formUncontrolled', () => {
  const useFormUncontrolledStore = (
    selector: (state: FormUncontrolledStore) => unknown
  ) => selector({ form: null, updateForm: updateFormMock });
  return { default: useFormUncontrolledStore };
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

describe('FormUncontrolled component', () => {
  it('shows validation errors for invalid input', async () => {
    const handleSubmit = vi.fn();
    render(<FormUncontrolled onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/Name must start with an uppercase/)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Enter positive value/)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must contain at least/)
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
    render(<FormUncontrolled onSubmit={handleSubmit} />);

    await userEvent.type(
      screen.getByLabelText(/Enter you name/i),
      mockFormData.name
    );
    await userEvent.type(
      screen.getByLabelText(/Enter you age/i),
      mockFormData.age
    );
    await userEvent.type(
      screen.getByLabelText(/Enter you email/i),
      mockFormData.email
    );
    await userEvent.type(
      screen.getByLabelText(/^Enter password/i),
      mockFormData.password
    );
    await userEvent.type(
      screen.getByLabelText(/Confirm password/i),
      mockFormData.confirmPassword
    );

    await userEvent.click(
      screen.getByRole('radio', { name: mockFormData.gender })
    );
    await userEvent.click(screen.getByLabelText(/Terms and Conditions/i));

    const file = new File(['image'], 'avatar.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(
      /Upload your picture/i
    ) as HTMLInputElement;

    await userEvent.upload(fileInput, file);
    await waitFor(() => {
      expect(updateFormMock).not.toHaveBeenCalled(); // nothing submitted yet
      // base64 preview should be set in DOM
      expect(screen.getByAltText(/preview/i)).toBeInTheDocument();
    });

    await userEvent.type(
      screen.getByLabelText(/Select your country/i),
      mockFormData.country
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
    expect(updateFormMock).toHaveBeenCalled();
  });

  it('shows password mismatch error', async () => {
    render(<FormUncontrolled onSubmit={() => {}} />);

    await userEvent.type(
      screen.getByLabelText(/^Enter password/i),
      mockFormData.password
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
