import router from './routes';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Spinner from './components/Spinner';

const queryClient = new QueryClient();

console.log(import.meta.env);

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
          </Suspense>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
