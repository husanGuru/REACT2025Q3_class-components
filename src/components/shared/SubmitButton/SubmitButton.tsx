import styles from './SubmitButton.module.css';

interface SubmitButtonProps {
  children?: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  children,
  label = 'Submit',
  disabled = false,
  ...props
}: SubmitButtonProps) {
  return (
    <button className={styles.btn} type="submit" disabled={disabled} {...props}>
      {children ?? label}
    </button>
  );
}
