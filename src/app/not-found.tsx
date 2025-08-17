'use client';

import CustomErrorPage from '@/components/CustomErrorPage/CustomErrorPage';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <CustomErrorPage title="Not Found!" message="Could not find resource" />
      </body>
    </html>
  );
}
