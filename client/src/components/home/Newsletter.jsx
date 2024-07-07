import generalStyle from '../../styles/App.module.css';
import style from './Newsletter.module.css';

function Newsletter() {
  return (
    <div className={style.container}>
      <section className={`${generalStyle.container} ${style.section}`}>
        <div>
          <h2 className={style.h2}>Receive our newsletter</h2>

          <p className={style.message}>
            Sign up for our newsletter to learn more about FaeCoin and the
            benefits of web3
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className={style.form}>
          <input type="email" placeholder="Enter email address" />

          <button>Subscribe</button>
        </form>

        <div className={style.policy}>
          <p>
            FaeCoin may use the contact information you provide to contact you
            about our products and services. By clicking “subscribe,” you
            consent to receive such communications. You may unsubscribe at any
            time. For information on how to unsubscribe, as well as our privacy
            practices and commitment to protecting your privacy, please review
            our <a href="">Privacy Policy</a>.
          </p>

          <p>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="">Privacy Policy</a> and <a href="">Terms of Service</a>{' '}
            apply.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Newsletter;
