import CustomErrorPage from '@/components/CustomErrorPage/CustomErrorPage';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return <CustomErrorPage title={t('title')} message={t('message')} />;
}
