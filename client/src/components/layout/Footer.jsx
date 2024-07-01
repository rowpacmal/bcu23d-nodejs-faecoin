import generalStyle from '../../styles/general.module.css';
import style from '../../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={generalStyle.container}>
        <p>&copy;2024 FaeCoin • A Magical World</p>
      </div>
    </footer>
  );
}

export default Footer;
