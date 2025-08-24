import InputError from '../InputError/InputError';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  name: string;
}

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export default function Select({
  label,
  name,
  options,
  error,
  ...props
}: SelectProps) {
  return (
    <div className={styles.selectWrapper}>
      <label htmlFor={name}>{label}</label>

      <input list={`${name}_list`} name={name} id={name} {...props} />

      <datalist id={`${name}_list`}>
        {options.map((option) => (
          <option key={option.value} value={option.name}></option>
        ))}
      </datalist>
      <InputError error={error} />
    </div>
  );
}
