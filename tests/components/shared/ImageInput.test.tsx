import { describe, it, expect, vi, beforeEach, MockInstance } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageInput } from '../../../src/components/shared';

describe('<ImageInput />', () => {
  let createObjectURLMock: MockInstance;

  beforeEach(() => {
    Object.defineProperty(global.URL, 'createObjectURL', {
      writable: true,
      value: vi.fn().mockReturnValue('mock-url'),
    });

    // Mock URL.createObjectURL
    createObjectURLMock = vi
      .spyOn(URL, 'createObjectURL')
      .mockImplementation(() => 'mock-url');

    // Mock FileReader
    class MockFileReader {
      result: string | null = 'data:image/png;base64,MOCK_BASE64';
      onloadend: (() => void) | null = null;
      readAsDataURL() {
        if (this.onloadend) this.onloadend(); // simulate async load
      }
    }
    vi.stubGlobal('FileReader', MockFileReader);
  });

  it('renders label and input', () => {
    render(<ImageInput label="Upload Image" name="image" />);
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload image/i)).toHaveAttribute(
      'type',
      'file'
    );
  });

  it('shows preview and calls onFileSelect on file selection', async () => {
    const user = userEvent.setup();
    const onFileSelect = vi.fn();

    render(
      <ImageInput
        label="Upload Image"
        name="image"
        onFileSelect={onFileSelect}
      />
    );

    const file = new File(['dummy content'], 'photo.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    await user.upload(input, file);

    expect(onFileSelect).toHaveBeenCalledTimes(1);
    expect(onFileSelect).toHaveBeenCalledWith(
      file,
      'data:image/png;base64,MOCK_BASE64'
    );

    // Expect preview image
    expect(screen.getByAltText(/preview/i)).toHaveAttribute('src', 'mock-url');
  });

  afterEach(() => {
    createObjectURLMock?.mockRestore();
    vi.unstubAllGlobals();
  });
});
