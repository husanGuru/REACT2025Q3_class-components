import CustomErrorPage from '@/components/CustomErrorPage/CustomErrorPage';

import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage() {
  const t = await getTranslations('NotFoundPage');

  return <CustomErrorPage title={t('title')} message={t('message')} />;
}
