export interface CountryRaw {
  iso_code: string;
  data: CO2Data[];
}
export interface Country {
  isoCode: string;
  name: string;
  population: number;
  data: CO2Data[];
}

export type CountriesRawData = {
  [countryName: string]: CountryRaw;
};

export interface CO2Data {
  population: number;
  year: number;
  co2: number;
  co2_per_capita: number;

  [key: string]: string | number;
}
