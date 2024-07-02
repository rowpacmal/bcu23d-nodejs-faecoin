import { Link, NavLink, useNavigate } from 'react-router-dom';
import generalStyle from '../../styles/general.module.css';
import style from '../../styles/Header.module.css';
import { useContext } from 'react';
import GlobalContext from '../../contexts/GlobalContext';

function Header() {
  const navigate = useNavigate();
  const { isValid, setIsValid } = useContext(GlobalContext);

  function handleSignOut() {
    localStorage.removeItem('TOKEN');

    setIsValid(false);
    navigate('/');
  }

  return (
    <header className={style.header}>
      <div className={`${generalStyle.container} ${style.container}`}>
        <Link to="/" className={style.link}>
          <img
            src="./src/assets/fae_logo.svg"
            alt=""
            width="100"
            height="100"
          />
          <span>Fae</span>
        </Link>

        <nav>
          <ul className={style.ul}>
            <li>
              <NavLink to="/">
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/explorer">
                <span>Explore</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/send">
                <span>Use</span>
              </NavLink>
            </li>

            <div className={style.control}>
              {!isValid ? (
                <>
                  <li>
                    <NavLink to="/login">
                      <button>Sign In</button>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/register">
                      <button>Sign Up</button>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/me">
                      <img
                        src="./src/assets/avatar.svg"
                        alt=""
                        width="30"
                        height="30"
                      />
                    </NavLink>
                  </li>

                  <li>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </li>
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
