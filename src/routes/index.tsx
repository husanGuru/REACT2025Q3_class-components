import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import ErorPage from '../pages/ErorPage';
import MainPage from '../pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErorPage />,
    children: [{ index: true, element: <MainPage /> }],
  },
]);

export default router;
