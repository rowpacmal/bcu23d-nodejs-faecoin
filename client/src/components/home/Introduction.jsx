import generalStyle from '../../styles/general.module.css';
import style from '../../styles/Introduction.module.css';

function Introduction() {
  return (
    <div className={generalStyle.container}>
      <div className={style.info}>
        <figure>
          <img
            src="./src/assets/Shopping.png"
            alt="Lady holding shopping bags"
            width="504"
            height="475"
          />
        </figure>

        <section>
          <h2>Buy, store, send, and swap with FaeCoin</h2>

          <p>
            Available on desktop, tablet and mobile devices, FaeCoin provides an
            encrypted platform, protected login, secure exchanges and
            transfers—everything you need to explore your digital finance.
          </p>
        </section>
      </div>

      <div className={style.info}>
        <section>
          <h2>Explore the blockchain</h2>

          <p>
            FaeCoin offers the simplest yet most secure way to connect with the
            blockchain and web3. Stay in control while interacting on the new
            decentralized web.
          </p>
        </section>

        <figure>
          <img
            src="./src/assets/Explore.png"
            alt="Lady holding shopping bags"
            width="567"
            height="475"
          />
        </figure>
      </div>
    </div>
  );
}

export default Introduction;
