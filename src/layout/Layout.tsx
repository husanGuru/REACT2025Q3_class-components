import styles from './Layout.module.css';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Navigation />

      {children}
    </div>
  );
}
