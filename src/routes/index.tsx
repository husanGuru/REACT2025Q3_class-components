import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/Main/MainPage';
import ErrorPage from '../pages/Error/ErrorPage';
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
