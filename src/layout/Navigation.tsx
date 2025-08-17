import styles from './Layout.module.css';

import ThemeToggler from '../components/ThemeToggler/ThemeToggler';
import { Link } from '@/i18n/navigation';

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <Link href={'/'}>Main page</Link>
      <Link href={'/about'}>About page</Link>
      <ThemeToggler />
    </div>
  );
}
