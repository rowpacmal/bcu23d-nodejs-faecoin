import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import AppContext from './contexts/AppContext';
import { useEffect, useState } from 'react';

import { getUserAccount } from './services/userService';
import {
  getPendingWalletBalance,
  getWalletBalance,
} from './services/walletService';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMining, setIsMining] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});
  const [pendingBalance, setPendingBalance] = useState();

  async function getUserInfo() {
    setIsLoading(true);

    const token = localStorage.getItem('TOKEN');

    if (!token) {
      return setIsLoading(false);
    }

    try {
      setUser(await getUserAccount(token));
      setWallet(await getWalletBalance(token));
      setPendingBalance(await getPendingWalletBalance(token));
      setIsValid(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          isLoading,
          setIsLoading,
          isMining,
          setIsMining,
          isValid,
          setIsValid,
          user,
          setUser,
          wallet,
          setWallet,
          pendingBalance,
          setPendingBalance,
          getUserInfo,
        }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
}

export default App;
