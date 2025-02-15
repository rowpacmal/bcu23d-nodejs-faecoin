import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import AppContext from '../../contexts/AppContext';
import Loading from '../Loading';

import generalStyle from '../../App.module.css';
import style from './Header.module.css';

function Header() {
  const { isLoading, isValid, setIsValid } = useContext(AppContext);

  function handleSignOut() {
    localStorage.removeItem('TOKEN');

    setIsValid(false);
  }

  return (
    <header className={style.header}>
      <div className={`${generalStyle.container} ${style.container}`}>
        <Link to="/" className={style.logo}>
          <img src="./src/assets/Logo.svg" alt="" width="100" height="100" />

          <span>Fae</span>
        </Link>

        <nav>
          <ul className={style.ul}>
            <li className={style.li}>
              <NavLink to="/">
                <span>Home</span>
              </NavLink>
            </li>

            <li className={style.li}>
              <NavLink to="/explore">
                <span>Explore</span>
              </NavLink>
            </li>

            {/* <div className={style.control}>
              <Loading setSpinner={true} />
            </div> */}

            <div className={style.control}>
              {isLoading ? (
                <Loading setSpinner={true} />
              ) : !isValid ? (
                <li className={style.li}>
                  <NavLink to="/login">
                    <button>Join</button>
                  </NavLink>
                </li>
              ) : (
                <div className={style.buttons}>
                  <li className={style.li}>
                    <NavLink to="/me">
                      <span>
                        <IconUserCircle size={32} stroke={1.75} />
                      </span>
                    </NavLink>
                  </li>

                  <li className={style.li}>
                    <Link to="/" onClick={handleSignOut}>
                      <IconLogout size={32} stroke={1.75} />
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
