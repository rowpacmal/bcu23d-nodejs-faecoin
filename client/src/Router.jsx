import { createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Missing from './pages/Missing';

import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Transaction from './pages/Transaction';
import User from './pages/User';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Missing />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/send',
        element: <Transaction />,
      },
      {
        path: '/me',
        element: <User />,
      },
    ],
  },
]);
