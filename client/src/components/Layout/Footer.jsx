import style from '../../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <p>&copy; 2024, FaeCoin</p>
      </div>
    </footer>
  );
}

export default Footer;
