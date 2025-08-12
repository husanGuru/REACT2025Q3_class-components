import { RouterProvider } from 'react-router';
import router from './routes';
import ThemeContextProvider from './context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient({
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
