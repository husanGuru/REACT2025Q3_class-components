import { create } from 'zustand';

export interface ColumnsStore {
  columns: string[];
  updateColumns: (updatedColumns: string[]) => void;
}
const COLUMNS = 'columns';

const useColumns = create<ColumnsStore>((set) => ({
  columns: JSON.parse(localStorage.getItem(COLUMNS) as string) ?? [],
  updateColumns: (updatedColumns: string[]) => {
    localStorage.setItem(COLUMNS, JSON.stringify(updatedColumns));

    set({ columns: updatedColumns });
  },
}));

export default useColumns;
