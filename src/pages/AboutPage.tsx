import { Link } from 'react-router';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <h1>About Author Page</h1>
      <p>The author was in a bit of a hurry :)</p>
      <a href="https://rs.school/courses/reactjs">RS School React Course</a>

      <Link to={'/'}>Main page</Link>
    </div>
  );
}
