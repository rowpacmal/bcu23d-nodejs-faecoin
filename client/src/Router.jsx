import { createBrowserRouter } from 'react-router-dom';

import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

import Explorer from './pages/Explorer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Transaction from './pages/Transaction';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
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
        path: '/explorer',
        element: <Explorer />,
      },
      {
        path: '/transaction',
        element: <Transaction />,
      },
    ],
  },
]);
