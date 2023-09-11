import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <main className={pathname !== '/' ? 'pt-16' : ''}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
