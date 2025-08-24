import { render, screen } from '@testing-library/react';
import { SubmitButton } from '../../../src/components/shared';

describe('SubmitButton Component', () => {
  it('renders the button', () => {
    render(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
