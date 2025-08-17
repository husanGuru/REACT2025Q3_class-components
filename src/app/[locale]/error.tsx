'use client'; // Error boundaries must be Client Components

import CustomErrorPage from '@/components/CustomErrorPage/CustomErrorPage';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorPage');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <CustomErrorPage title={t('title')} message={error.message}>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          {t('Try again')}
        </button>
      </CustomErrorPage>
    </div>
  );
}
