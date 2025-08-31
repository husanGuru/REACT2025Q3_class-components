import { create } from 'zustand';

export interface SortStore {
  sort: 'asc' | 'desc' | null;
  updateSort: () => void;
}

const useSort = create<SortStore>((set, get) => ({
  sort: null,
  updateSort: () => {
    set({ sort: get().sort === 'asc' ? 'desc' : 'asc' });
  },
}));

export default useSort;
