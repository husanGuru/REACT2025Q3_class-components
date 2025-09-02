import { Country } from 'src/types/country.types';
import CountryTable from '../CountryTable/CountryTable';

import styles from './CountryItem.module.css';
import { formatPopulation } from 'src/utils/country';
import { NA } from 'src/utils/const';
import { memo } from 'react';

interface CountryItemProps {
  country: Country;
  style?: React.CSSProperties;
}

const CountryItem = memo(function CountryItem({
  country,
  style,
}: CountryItemProps) {
  return (
    <details className={styles.country} style={style}>
      <summary className={styles.summary}>
        <div className={styles.summaryContent}>
          <div>
            &emsp;
            {country.isoCode ?? NA}
          </div>
          <div>{country.name}</div>
          <div>
            {country.population ? formatPopulation(country.population) : NA}
          </div>
        </div>
      </summary>
      <div className={styles.table}>
        <CountryTable data={country.data} />
      </div>
    </details>
  );
});

export default CountryItem;
