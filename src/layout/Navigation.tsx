import { Link } from 'react-router';
import styles from './Layout.module.css';

import ThemeToggler from '../components/ThemeToggler/ThemeToggler';

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <Link to={'/'}>Main page</Link>
      <Link to={'/about'}>About page</Link>
      <ThemeToggler />
    </div>
  );
}
