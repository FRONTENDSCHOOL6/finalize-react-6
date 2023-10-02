import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageHead from '@/components/PageHead';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <PageHead title="Jeju All in One - 나만의 제주" />
      <Header />
      <main
        className={`dark:bg-slate-700 dark:text-slate-200 ${
          pathname !== '/' ? 'py-28' : ''
        }`}
      >
        <Outlet />
        <ScrollToTop />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
