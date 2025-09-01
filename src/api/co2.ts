import axios from 'axios';
import { API_URL } from '../utils/const';
import { CountriesRawData } from 'src/types/country.types';
import { parseCountries } from 'src/utils/country';

// uncomment for using ready json file
import data from 'src/assets/owid-co2-data.json';

export async function getCO2Data(signal?: AbortSignal) {
  // comment this line to use json file
  // const response = await axios.get<CountriesRawData>(API_URL, { signal });

  // uncomment for using ready json file
  return parseCountries(data as CountriesRawData);

  // comment this line to use json file
  // return parseCountries(response.data);
}
