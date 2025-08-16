import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/[locale]/page';
import { NextIntlClientProvider } from 'next-intl';

import messages from '../messages/en.json';

test('Page', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Page />
    </NextIntlClientProvider>
  );

  expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
});
