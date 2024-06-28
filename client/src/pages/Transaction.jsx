import { useContext, useState } from 'react';
import updateFormData from '../utils/updateFormData';
import { Link } from 'react-router-dom';
import { addTransaction } from '../services/transactionService';
import GlobalContext from '../contexts/GlobalContext';

function Transaction() {
  const { isValid } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
  });

  function handleChange(e) {
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('TOKEN');
    const data = { ...formData, amount: +formData.amount };

    addTransaction(token, data);
  }

  return (
    <section>
      <h2>Transaction</h2>

      {isValid ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Recipient
              <br />
              <input
                name="recipient"
                type="text"
                placeholder="Recipient's wallet address..."
                value={formData.recipient}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Amount
              <br />
              <input
                name="amount"
                type="number"
                placeholder="0.00 Fae"
                value={formData.amount}
                onChange={handleChange}
              />
            </label>
          </div>

          <button>Send</button>
        </form>
      ) : (
        <p>
          To continue, please <Link to="/login">sign in</Link> to your existing
          account or <Link to="/register">create</Link> a new one.
        </p>
      )}
    </section>
  );
}

export default Transaction;
