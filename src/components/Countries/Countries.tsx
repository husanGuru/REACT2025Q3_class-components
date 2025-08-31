import { Country } from 'src/types/country.types';
import { UseQueryResult } from '@tanstack/react-query';
import { use, useMemo } from 'react';
import CountryItem from './CountryItem/CountryItem';

import styles from './Countries.module.css';
import Columns from '../shared/Columns/Columns';
import useSort from 'src/store/sort';

interface CountriesProps {
  query: UseQueryResult<Country[]>;
  search: string;
}

export default function Countries({ query, search }: CountriesProps) {
  const countries = use(query.promise);

  const sort = useSort((selector) => selector.sort);

  const filteredCountries = useMemo(() => {
    let result = search
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        )
      : countries;

    if (sort) {
      result = [...result].sort((a, b) =>
        sort === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    return result;
  }, [countries, search, sort]);

  return (
    <div className={styles.countries}>
      <Columns columns={Object.keys(countries[0]).slice(0, -1)} />
      {filteredCountries.map((country) => (
        <CountryItem key={country.name} country={country} />
      ))}
    </div>
  );
}
