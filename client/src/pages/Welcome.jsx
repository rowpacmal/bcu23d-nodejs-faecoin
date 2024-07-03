import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

function Welcome() {
  const { user } = useContext(UserContext);

  return <h2>Welcome {user?.name}!</h2>;
}

export default Welcome;
