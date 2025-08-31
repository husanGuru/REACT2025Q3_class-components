import { create } from 'zustand';

export interface YearStore {
  selectedYear: number | null;
  updateSelectedYear: (year: number | null) => void;
}

const useYear = create<YearStore>((set) => ({
  selectedYear: null,
  updateSelectedYear: (year: number | null) => {
    set({ selectedYear: year });
  },
}));

export default useYear;
