import { Outlet } from 'react-router';
import Navigation from './Navigation';

import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navigation />
      <Outlet />
    </div>
  );
}
