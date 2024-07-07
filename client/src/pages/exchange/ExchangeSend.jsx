import { useState } from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';

import { updateFormData } from '../../utils/formDataHandler';
import { addTransaction } from '../../services/transactionService';

import generalStyle from '../../styles/general.module.css';
import formStyle from '../../styles/Form.module.css';
import style from '../../styles/Transaction.module.css';

function ExchangeSend() {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
  });
  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  function handleChange(e) {
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('TOKEN');
      const data = {
        recipient: formData.recipient,
        amount: +formData.amount,
      };

      await addTransaction(token, data);

      setFormData({
        recipient: '',
        amount: '',
      });
    } catch (error) {
      if (warning) return;

      setWarning(error.message);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => setWarning(null), 1000);
      }, 3000);
    }
  }

  return (
    <section className={style.section}>
      <h3>
        <IconArrowUpRight /> Send Transaction
      </h3>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={formStyle.fields}>
          <div className={formStyle.input}>
            <label htmlFor="recipient">Recipient</label>

            <input
              id="recipient"
              name="recipient"
              type="text"
              placeholder="Enter wallet address"
              value={formData.recipient}
              onChange={handleChange}
              required
            />
          </div>

          <div className={formStyle.input}>
            <label htmlFor="amount">Amount</label>

            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00 Fae"
              min="0"
              step="any"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={style.control}>
          <p
            className={`${formStyle.warning}${
              isVisible ? ` ${formStyle.show}` : ''
            }`}
          >
            {warning}
          </p>

          <div className={formStyle.buttons}>
            <button type="submit">Send</button>
          </div>
        </div>
      </form>

      <p className={`${generalStyle.alert} ${style.tip}`}>
        <span className={generalStyle.embolden}>Tip</span> To add a transaction
        on the Fae chain, enter the recipient, and amount details. Once
        submitted, the transaction will be validated and added to the
        transaction pool. After the block is mined, your transaction will be
        permanently recorded on the blockchain, ensuring it is secure and
        transparent. The new block will then be broadcast to all nodes in the
        network to keep everything in sync.
      </p>
    </section>
  );
}

export default ExchangeSend;
