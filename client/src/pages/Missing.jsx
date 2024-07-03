import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import style from '../styles/Main.module.css';

function Missing() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main className={style.main}>
        <h2>Not Found</h2>
      </main>

      <Footer />
    </>
  );
}

export default Missing;
