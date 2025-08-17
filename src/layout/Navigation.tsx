import styles from './Layout.module.css';

import ThemeToggler from '../components/ThemeToggler/ThemeToggler';
import { Link } from '@/i18n/navigation';
import LangSwitcher from './LangSwitcher/LangSwitcher';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <div className={styles.navigation}>
      <Link href={'/'}>{t('Main')}</Link>
      <Link href={'/about'}>{t('About')}</Link>
      <ThemeToggler />
      <LangSwitcher />
    </div>
  );
}
