import { useContext, useState } from 'react';
import updateFormData from '../utils/updateFormData';
import { Link } from 'react-router-dom';
import {
  addTransaction,
  getTransactions,
} from '../services/transactionService';
import GlobalContext from '../contexts/GlobalContext';

function Transaction() {
  const { isValid } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
  });
  const [transactions, setTransactions] = useState({});

  async function handleTransactionPool() {
    const token = localStorage.getItem('TOKEN');
    const txn = await getTransactions(token);

    console.log(txn);

    setTransactions(txn);
  }

  function handleChange(e) {
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('TOKEN');
    const data = { ...formData, amount: +formData.amount };

    await addTransaction(token, data);

    setFormData({
      recipient: '',
      amount: '',
    });
  }

  return (
    <section>
      <h2>Transaction</h2>
      <section>
        <h3>Send Transaction</h3>

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
            To continue, please <Link to="/login">sign in</Link> to your
            existing account or <Link to="/register">create</Link> a new one.
          </p>
        )}
      </section>

      <section>
        <h3>Latest Transactions</h3>

        <ul></ul>
      </section>
    </section>
  );
}

export default Transaction;
