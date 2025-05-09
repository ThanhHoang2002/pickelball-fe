import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, Suspense } from 'react';

import GlobalLoading from '@/components/loading/GlobalLoading';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';

type AppProviderProps = {
  children: ReactNode;
};


export const AppProvider = ({ children }: AppProviderProps) => {
  return (
   <Suspense fallback = {<GlobalLoading/>}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
        <Toaster />
      </QueryClientProvider>
   </Suspense>
  );
};
