import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useSelectedCharacters from '../../src/store/selectedCharacters';
import TotalSelected from '../../src/components/TotalSelected/TotalSelected';
import { downloadCSV } from '../../src/utils/csv';
import { mockCharacters } from '../__mocks__/characters';

vi.mock('../../src/utils/csv', () => ({
  downloadCSV: vi.fn(),
}));

describe('TotalSelected', () => {
  it('should render nothing when no characters are selected', () => {
    const { container } = render(<TotalSelected />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should show selected count and buttons', () => {
    const store = useSelectedCharacters.getState();
    store.updateSelectedCharacters(mockCharacters[0]);

    render(<TotalSelected />);
    expect(
      screen.getByText(/Total selected characters: 1/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  it('should call unselectAll when "Unselect all" button is clicked', async () => {
    const user = userEvent.setup();
    const store = useSelectedCharacters.getState();

    store.updateSelectedCharacters(mockCharacters[0]);

    render(<TotalSelected />);
    await user.click(screen.getByRole('button', { name: /Unselect all/i }));

    expect(useSelectedCharacters.getState().selectedCharacters).toEqual([]);
  });

  it('should call downloadCSV with selected characters', async () => {
    const user = userEvent.setup();
    const store = useSelectedCharacters.getState();

    store.updateSelectedCharacters(mockCharacters[0]);

    render(<TotalSelected />);
    await user.click(screen.getByRole('button', { name: /Download/i }));

    expect(downloadCSV).toHaveBeenCalledWith([mockCharacters[0]]);
  });
});
