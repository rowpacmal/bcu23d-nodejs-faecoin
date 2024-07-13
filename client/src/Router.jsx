import { createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import Missing from './pages/Missing';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';

import User from './pages/user/User';
import Welcome from './pages/user/Welcome';
import Profile from './pages/user/Profile';
import Mine from './pages/user/Mine';

import Exchange from './pages/exchange/Exchange';
import ExchangeIndex from './pages/exchange/ExchangeIndex';
import ExchangeSend from './pages/exchange/ExchangeSend';

import Demo from './components/Demo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Missing />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
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
            element: <Exchange />,
            children: [
              {
                index: true,
                element: <ExchangeIndex />,
              },
              {
                path: '/me/exchange/buy',
                element: <Demo />,
              },
              {
                path: '/me/exchange/sell',
                element: <Demo />,
              },
              {
                path: '/me/exchange/swap',
                element: <Demo />,
              },
              {
                path: '/me/exchange/send',
                element: <ExchangeSend />,
              },
              {
                path: '/me/exchange/receive',
                element: <Demo />,
              },
            ],
          },
          {
            path: '/me/mine',
            element: <Mine />,
          },
        ],
      },
    ],
  },
]);
