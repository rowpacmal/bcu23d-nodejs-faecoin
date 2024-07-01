import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import style from '../styles/Main.module.css';

function Layout() {
  return (
    <>
      <Header />

      <main className={style.main}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
