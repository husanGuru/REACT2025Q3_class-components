import { Link } from 'react-router';
import styles from './Layout.module.css';

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <Link to={'/'}>Main page</Link>
    </div>
  );
}
