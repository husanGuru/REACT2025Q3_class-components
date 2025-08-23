import { RouterProvider } from 'react-router';
import './App.css';
import router from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
