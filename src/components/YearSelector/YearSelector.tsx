import useYear from 'src/store/year';
import styles from './YearSelector.module.css';

const YEARS = Array.from({ length: 2023 - 1750 + 1 }, (_, i) => 1750 + i);

export default function YearSelector() {
  const { selectedYear, updateSelectedYear } = useYear();
  return (
    <div className={styles.year}>
      <p>Year selector</p>
      <select
        name="year"
        id="year"
        value={String(selectedYear)}
        onChange={(e) => {
          if (e.target.value) {
            updateSelectedYear(Number(e.target.value));
          } else {
            updateSelectedYear(null);
          }
        }}
      >
        <option value={''}>Select a year</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
