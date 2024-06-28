import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import GlobalContext from './contexts/GlobalContext';
import { useEffect, useState } from 'react';
import { validateToken } from './services/userService';

function App() {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function validToken() {
      const response = await validateToken(localStorage.getItem('TOKEN'));
      setIsValid(response?.success ? true : false);
    }

    validToken();
  }, []);

  return (
    <>
      <GlobalContext.Provider value={{ isValid, setIsValid }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
