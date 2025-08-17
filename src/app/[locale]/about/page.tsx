import React from 'react';

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  return (
    <div className={styles.aboutPage}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <a href="https://rs.school/courses/reactjs">{t('schoolLink')}</a>
    </div>
  );
}
