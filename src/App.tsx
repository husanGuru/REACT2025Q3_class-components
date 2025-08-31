import { RouterProvider } from 'react-router';

import router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 30, // data stays fresh for 30 minutes
        gcTime: 1000 * 60 * 40, // keep unused data for 40 min
        refetchOnWindowFocus: false, // don't refetch when user switches tabs
        refetchOnReconnect: true, // refetch if network reconnects
        refetchOnMount: false, // don't refetch on component mount if cached
        experimental_prefetchInRender: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
