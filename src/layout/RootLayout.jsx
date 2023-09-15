import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <main className={pathname !== '/' ? 'py-28 ' : ''}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
