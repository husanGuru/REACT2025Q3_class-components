import { useState } from 'react';
import styles from './ImageInput.module.css';
import InputError from '../InputError/InputError';

interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  initialValue?: string;
  onFileSelect?: (file: File, base64: string) => void;
  maxSizeMB?: number;
  error?: string;
}

export default function ImageInput({
  name,
  initialValue,
  label,
  error,
  onFileSelect,
}: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(initialValue ?? null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onFileSelect?.(file, base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.imageInput}>
      <label htmlFor={name}>{label}</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        id={name}
        name={name}
        onChange={handleChange}
      />
      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="Preview" />
        </div>
      )}
      <InputError error={error} />
    </div>
  );
}
