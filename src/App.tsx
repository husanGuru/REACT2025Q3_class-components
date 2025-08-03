import { RouterProvider } from 'react-router';
import router from './routes';
import ThemeContextProvider from './context/ThemeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}
