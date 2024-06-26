import { NavLink, useNavigate } from 'react-router-dom';
import style from '../../styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('TOKEN');

    navigate('/');
  }

  return (
    <header className={style.header}>
      <img src="./src/assets/react.svg" alt="" width="100" height="100" />

      <nav>
        <ul className={style.ul}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/explorer">Explorer</NavLink>
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
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
