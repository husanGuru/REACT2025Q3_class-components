import { createBrowserRouter } from 'react-router';
import Layout from '../layout/Layout';
import ErorPage from '../pages/ErorPage';
import MainPage from '../pages/MainPage';
import AboutPage from '../pages/AboutPage';
import CharacterPage from '../pages/CharacterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErorPage />,
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
    ],
  },
  { path: '/about', element: <AboutPage /> },
]);

export default router;
