import { CO2Data } from 'src/types/country.types';
import { NA } from 'src/utils/const';
import styles from './CountryTable.module.css';
import Columns from 'src/components/shared/Columns/Columns';
import useColumns from 'src/store/columns';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import Truncate from 'src/components/shared/Truncate/Truncate';
import { formatPopulation } from 'src/utils/country';
import useYear from 'src/store/year';

interface CountryTableProps {
  data: CO2Data[];
}

const initialColumns = ['year', 'population', 'co2', 'co2_per_capita'];

export default function CountryTable({ data }: CountryTableProps) {
  const columns = useColumns((selector) => selector.columns);
  const selectedYear = useYear((selector) => selector.selectedYear);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 25,
    overscan: 5,
  });

  const filteredData = useMemo(
    () => selectedYear && data.find((item) => item.year === selectedYear),
    [data, selectedYear]
  );

  return (
    <div className={styles.tableWrapper}>
      <Columns columns={[...initialColumns, ...columns]} />
      <div
        className={styles.table}
        ref={parentRef}
        style={{
          height: `200px`,
          overflow: 'auto',
        }}
      >
        {selectedYear ? (
          filteredData && (
            <div className={styles.tableItem}>
              <div>
                <Truncate text={filteredData.year ?? NA} />
              </div>
              <div>
                <Truncate
                  text={
                    filteredData.population
                      ? formatPopulation(filteredData.population)
                      : NA
                  }
                />
              </div>
              <div>
                <Truncate text={filteredData.co2 ?? NA} />
              </div>
              <div>
                <Truncate text={filteredData.co2_per_capita ?? NA} />
              </div>
              {columns.map((column) => (
                <div key={column}>
                  <Truncate text={filteredData[column] ?? NA} />
                </div>
              ))}
            </div>
          )
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((item) => {
              const dataItem = data[item.index];
              return (
                <div
                  key={item.key}
                  className={styles.tableItem}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${item.size}px`,
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  <div>
                    <Truncate text={dataItem.year ?? NA} />
                  </div>
                  <div>
                    <Truncate
                      text={
                        dataItem.population
                          ? formatPopulation(dataItem.population)
                          : NA
                      }
                    />
                  </div>
                  <div>
                    <Truncate text={dataItem.co2 ?? NA} />
                  </div>
                  <div>
                    <Truncate text={dataItem.co2_per_capita ?? NA} />
                  </div>
                  {columns.map((column) => (
                    <div key={column}>
                      <Truncate text={dataItem[column] ?? NA} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
