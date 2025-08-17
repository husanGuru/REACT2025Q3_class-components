'use client';

import ThemeContextProvider from '@/context/ThemeContext';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5, // data stays fresh for 5 minutes
        gcTime: 1000 * 60 * 10, // keep unused data for 10 min
        refetchOnWindowFocus: false, // don't refetch when user switches tabs
        refetchOnReconnect: true, // refetch if network reconnects
        refetchOnMount: false, // don't refetch on component mount if cached
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </QueryClientProvider>
  );
}
