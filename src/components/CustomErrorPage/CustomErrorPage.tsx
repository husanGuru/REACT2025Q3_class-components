import React from 'react';

import styles from './CustomErrorPage.module.css';

interface CustomErrorPageProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export default function CustomErrorPage({
  title,
  message,
  children,
}: CustomErrorPageProps) {
  return (
    <div className={styles.errorPage}>
      <h1>{title}</h1>
      <p>{message}</p>
      {children}
    </div>
  );
}
