import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

export function renderWithRouter(ui: React.ReactNode, route = '/') {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}
