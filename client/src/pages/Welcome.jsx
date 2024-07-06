import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { IconSparkles } from '@tabler/icons-react';

function Welcome() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2>
        <IconSparkles />
        Welcome to FaeCoin!
      </h2>

      <section>
        <h3>We&apos;re glad to see you, {user?.name}!</h3>

        <p>
          Thank you for joining the FaeCoin community. Your account and wallet
          are ready for action. Explore the power of FaeCoin by managing your
          assets, making secure transactions, and participating in the
          decentralized future of finance.
        </p>

        <p>
          If you need any assistance, our support team is here to help. Happy
          exploring!
        </p>
      </section>
    </>
  );
}

export default Welcome;
