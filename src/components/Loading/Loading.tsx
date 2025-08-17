import { useTranslations } from 'next-intl';
import styles from './Loading.module.css';

export default function Loading() {
  const t = useTranslations();
  return <div className={styles.loading}>{t('Loading')}</div>;
}
