import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ru', 'uz'];

export const routing = defineRouting({
  locales: locales,
  defaultLocale: locales[0],
});
