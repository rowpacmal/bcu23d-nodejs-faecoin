import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

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
