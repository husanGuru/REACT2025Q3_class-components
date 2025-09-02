import { CountriesRawData, Country } from 'src/types/country.types';

export function parseCountries(countries: CountriesRawData): Country[] {
  return Object.entries(countries).map(([name, country]) => ({
    isoCode: country.iso_code,
    name,
    population: country.data.at(-1)?.population ?? 0,
    data: country.data,
  }));
}

export function formatPopulation(value: number, divider: string = ' '): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, divider);
}
