import { QueryClient } from '@tanstack/react-query';

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

export default queryClient;
