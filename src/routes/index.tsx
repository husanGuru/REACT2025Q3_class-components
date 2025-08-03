import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/MainPage';
import AboutPage from '../pages/AboutPage';
import CharacterPage from '../pages/CharacterPage';
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
        children: [
          {
            path: 'character/:id',
            element: <CharacterPage />,
          },
        ],
      },
      { path: '/about', element: <AboutPage /> },
    ],
  },
]);

export default router;
