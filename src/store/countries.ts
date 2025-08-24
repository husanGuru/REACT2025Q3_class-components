import { create } from 'zustand';
import { Country } from '../types/country.types';
import { COUNTRIES } from '../utils/const';

export interface CountriesStore {
  countries: Country[];
}

const useCountries = create<CountriesStore>((set) => ({
  countries: COUNTRIES,
  updateCountries: (updatedCountries: Country[]) => {
    set({ countries: updatedCountries });
  },
}));

export default useCountries;
