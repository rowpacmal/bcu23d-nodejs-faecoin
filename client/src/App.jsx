import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import AppContext from './contexts/AppContext';
import { useEffect, useState } from 'react';
import { validateToken } from './services/userService';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function validToken() {
      setIsLoading(true);

      try {
        const response = await validateToken(localStorage.getItem('TOKEN'));

        setIsValid(response ? true : false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    validToken();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ isLoading, isValid, setIsValid }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
}

export default App;
