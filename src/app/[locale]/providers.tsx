'use client';

import ThemeContextProvider from '@/context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './get-query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </QueryClientProvider>
  );
}
