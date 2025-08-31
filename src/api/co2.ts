import axios from 'axios';
import { API_URL } from '../utils/const';
import data from 'src/assets/owid-co2-data.json';
import { parseCountries } from 'src/utils/country';
import { CountriesRawData } from 'src/types/country.types';

export async function getCO2Data(signal?: AbortSignal) {
  // const data = await axios.get(API_URL, { signal });

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return parseCountries(data as CountriesRawData);
}
