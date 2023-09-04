import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Suspense fallback="페이지 로딩 중...">
              <RouterProvider router={router} />
            </Suspense>
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
