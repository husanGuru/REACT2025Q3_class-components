import { Country } from 'src/types/country.types';
import { UseQueryResult } from '@tanstack/react-query';
import { use } from 'react';
import CountryItem from './CountryItem/CountryItem';

import styles from './Countries.module.css';
import Columns from '../shared/Columns/Columns';

interface CountriesProps {
  query: UseQueryResult<Country[]>;
}

export default function Countries({ query }: CountriesProps) {
  const countries = use(query.promise);

  return (
    <div className={styles.countries}>
      <Columns columns={Object.keys(countries[0]).slice(0, -1)} />
      {countries.map((country) => (
        <CountryItem key={country.name} country={country} />
      ))}
    </div>
  );
}
