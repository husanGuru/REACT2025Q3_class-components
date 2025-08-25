import { FormFields } from '../../types/form.types';

import styles from './FormResult.module.css';

export default function FormResult({
  data,
  isNew,
  title,
}: {
  data: FormFields | null;
  isNew: boolean;
  title: string;
}) {
  if (!data) {
    return null;
  }

  return (
    <div className={`${styles.formResult} ${isNew ? styles.new : ''}`}>
      <h2>{title}</h2>
      <div>
        {Object.entries(data).map(([key, value]) => {
          if (key === 'imageBase64') {
            return null;
          }

          return (
            <div key={key} className={styles.item}>
              <div className={styles.key}>{key}: </div>
              <div className={styles.value}>
                {value instanceof File ? (
                  <img
                    src={data.imageBase64}
                    alt="Image"
                    width={100}
                    height={100}
                    className={styles.image}
                  />
                ) : (
                  String(value)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
