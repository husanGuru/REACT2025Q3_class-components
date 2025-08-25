import InputError from '../InputError/InputError';
import styles from './Radio.module.css';

interface RadioOption {
  value: string | number;
  name: string;
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  options: RadioOption[];
  error?: string;
}
export default function Radio({
  label,
  name,
  options,
  error,
  ...props
}: RadioProps) {
  return (
    <div className={styles.radio}>
      <p>{label}</p>
      {options.map((option) => (
        <div key={option.value} className={styles.radioWrapper}>
          <label htmlFor={option.name}>{option.name}</label>

          <input
            type="radio"
            value={option.value}
            name={name}
            id={option.name}
            {...props}
          />
        </div>
      ))}
      <InputError error={error} />
    </div>
  );
}
