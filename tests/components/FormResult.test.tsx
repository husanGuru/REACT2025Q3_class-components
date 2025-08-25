import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormResult from '../../src/components/FormResult/FormResult';
import { FormFields } from '../../src/types/form.types';

describe('<FormResult />', () => {
  it('renders null when data is null', () => {
    const { container } = render(
      <FormResult data={null} isNew={false} title="Test Title" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title and form fields', () => {
    const mockData: FormFields = {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      gender: 'female',
      terms: true,
      image: new File(['dummy'], 'photo.png', { type: 'image/png' }),
      imageBase64: 'data:image/png;base64,MOCK_BASE64',
      country: 'USA',
    };

    render(<FormResult data={mockData} isNew={true} title="Form Result" />);

    // Check title
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Form Result'
    );

    // Check text fields
    expect(screen.getByText(/name:/i).nextSibling).toHaveTextContent('Alice');
    expect(screen.getByText('age:').nextSibling).toHaveTextContent('25');
    expect(screen.getByText(/email:/i).nextSibling).toHaveTextContent(
      'alice@example.com'
    );

    // Check file value renders image
    const img = screen.getByAltText(/image/i) as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'data:image/png;base64,MOCK_BASE64');
    expect(img.width).toBe(100);
    expect(img.height).toBe(100);
  });

  it('does not render imageBase64 as a separate field', () => {
    const mockData: FormFields = {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      gender: 'female',
      terms: true,
      image: new File(['dummy'], 'photo.png', { type: 'image/png' }),
      imageBase64: 'data:image/png;base64,MOCK_BASE64',
      country: 'USA',
    };

    render(<FormResult data={mockData} isNew={false} title="Test" />);

    // Should not render imageBase64 key as a div
    expect(screen.queryByText(/imageBase64:/i)).toBeNull();
  });
});
