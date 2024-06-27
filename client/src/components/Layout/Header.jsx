import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from '../../styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('TOKEN');

    navigate('/');
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/" className={style.link}>
          <img
            src="./src/assets/fae_logo.svg"
            alt=""
            width="100"
            height="100"
          />
          <h1>Fae</h1>
        </Link>

        <nav>
          <ul className={style.ul}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/explorer">Explorer</NavLink>
            </li>

            <li>
              <NavLink to="/send">Transaction</NavLink>
            </li>

            {!localStorage.getItem('TOKEN') ? (
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
                    <button>Me</button>
                  </NavLink>
                </li>

                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
