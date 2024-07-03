import { createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Missing from './pages/Missing';

import Explore from './pages/Explore';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Transaction from './pages/Transaction';

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
        path: '/me',
        element: <User />,
        children: [
          {
            index: true,
            element: <Welcome />,
          },
          {
            path: '/me/overview',
            element: <Profile />,
          },
          {
            path: '/me/exchange',
            element: <h2>Exchange</h2>,
          },
          {
            path: '/me/send',
            element: <Transaction />,
          },
          {
            path: '/me/stake',
            element: <h2>Stake</h2>,
          },
        ],
      },
    ],
  },
]);
