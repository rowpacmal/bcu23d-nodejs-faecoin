import { useState } from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';
import Form from '../../components/form/Form';

import { updateFormData } from '../../utils/formDataHandler';
import { addTransaction } from '../../services/transactionService';

import generalStyle from '../../styles/App.module.css';
import style from '../../styles/Transaction.module.css';

const formLayout = [
  {
    label: 'Recipient',
    name: 'recipient',
    type: 'text',
    placeholder: 'Enter wallet address',
    required: true,
  },
  {
    label: 'Amount',
    name: 'amount',
    type: 'number',
    placeholder: '0.00 Fae',
    required: true,
  },
];
const formButtons = <button type="submit">Send</button>;

function ExchangeSend() {
  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
  });

  function handleChange(e) {
    updateFormData({ e, formData, setFormData });
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

      <Form
        formLayout={formLayout}
        formButtons={formButtons}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        warning={warning}
      />

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
