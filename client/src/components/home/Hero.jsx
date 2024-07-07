import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

import generalStyle from '../../styles/App.module.css';
import style from '../../styles/Hero.module.css';

function Hero() {
  const { isValid } = useContext(AppContext);

  return (
    <div className={`${generalStyle.container} ${style.wrapper}`}>
      <section className={style.section}>
        <h1>Unlock the Future of Finance with FaeCoin</h1>

        <p>
          Welcome! Join us on a journey to revolutionize digital finance.
          Empower your transactions with FaeCoin: Your Gateway to Decentralized
          Finance.
        </p>

        <div>
          <Link to={isValid ? '/me' : '/login'}>
            <button className={style.button}>Let&apos;s get started</button>
          </Link>
        </div>
      </section>

      <figure>
        <img
          src="./src/assets/Hero.png"
          alt="Hero splash art"
          width="627"
          height="518"
        />
      </figure>
    </div>
  );
}

export default Hero;
