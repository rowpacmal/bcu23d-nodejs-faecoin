import { Link } from 'react-router-dom';

import generalStyle from '../../App.module.css';
import style from './Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={`${generalStyle.container} ${style.container}`}>
        <Link className={style.logo}>
          <img src="./src/assets/Logo.svg" alt="" width="100" height="100" />

          <span>Fae</span>
        </Link>

        <div className={style.links}>
          <section className={style.section}>
            <h3 className={style.h3}>Learn More</h3>

            <ul className={style.ul}>
              <li>
                <Link>About</Link>
              </li>

              <li>
                <Link>Developers</Link>
              </li>

              <li>
                <Link to="/register">Sign up</Link>
              </li>

              <li>
                <Link>FaeCoin Foundation</Link>
              </li>

              <li>
                <Link>News</Link>
              </li>

              <li>
                <Link>Security</Link>
              </li>
            </ul>
          </section>

          <section className={style.section}>
            <h3 className={style.h3}>Get Involved</h3>

            <ul className={style.ul}>
              <li>
                <Link>GitHub</Link>
              </li>

              <li>
                <Link>Grants</Link>
              </li>

              <li>
                <Link>Open Positions</Link>
              </li>

              <li>
                <Link>Merch Shop</Link>
              </li>

              <li>
                <Link>Press & Partnerships</Link>
              </li>
            </ul>
          </section>

          <section className={style.section}>
            <h3 className={style.h3}>Legal</h3>

            <ul className={style.ul}>
              <li>
                <Link>Privacy Policy</Link>
              </li>

              <li>
                <Link>Terms of Use</Link>
              </li>

              <li>
                <Link>Contributor License Agreement</Link>
              </li>

              <li>
                <Link>Site Map</Link>
              </li>
            </ul>
          </section>
        </div>

        <p className={style.copy}>&copy;2024 FaeCoin • A Magical World</p>
      </div>
    </footer>
  );
}

export default Footer;
