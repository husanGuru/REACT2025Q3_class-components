import InputError from '../InputError/InputError';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Checkbox({
  label,
  name,
  error,
  ...props
}: CheckboxProps) {
  return (
    <div className={styles.checkboxWrapper}>
      <label htmlFor={name}>{label}</label>
      <input type="checkbox" id={name} name={name} {...props} />
      <InputError error={error} />
    </div>
  );
}
