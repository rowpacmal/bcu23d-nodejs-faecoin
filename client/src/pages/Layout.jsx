import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import style from '../styles/Main.module.css';

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main className={style.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
