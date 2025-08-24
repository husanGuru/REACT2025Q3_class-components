import InputError from '../InputError/InputError';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  name,
  type = 'text',
  error,
  ...props
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        {...props}
      />
      <InputError error={error} />
    </div>
  );
}
