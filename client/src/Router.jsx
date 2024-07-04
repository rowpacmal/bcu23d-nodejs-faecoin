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
import Send from './pages/exchange/Send';

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
            element: <Transaction />,
            children: [
              {
                index: true,
                element: <h3>Buy, sell, swap, send and receive FaeCoin!</h3>,
              },
              {
                path: '/me/exchange/buy',
                element: <h3>Buy</h3>,
              },
              {
                path: '/me/exchange/sell',
                element: <h3>Sell</h3>,
              },
              {
                path: '/me/exchange/swap',
                element: <h3>Swap</h3>,
              },
              {
                path: '/me/exchange/send',
                element: <Send />,
              },
              {
                path: '/me/exchange/receive',
                element: <h3>Receive</h3>,
              },
            ],
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
