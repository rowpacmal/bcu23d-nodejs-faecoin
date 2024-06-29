import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

import generalStyle from '../styles/general.module.css';
import style from '../styles/Main.module.css';

function Layout() {
  return (
    <>
      <Header />

      <main className={`${generalStyle.container} ${style.main}`}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
