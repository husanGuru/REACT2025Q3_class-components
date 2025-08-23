import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/MainPage';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
