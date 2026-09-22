import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Query functions read IndexedDB before falling back to the network.
            // Let that first attempt run offline; only network retries should pause.
            networkMode: 'offlineFirst',
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});
