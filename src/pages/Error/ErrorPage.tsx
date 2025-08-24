import { useRouteError, isRouteErrorResponse } from 'react-router';

import styles from './page.module.css';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'Error occured';
  let message = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = error.data?.message || 'Internal Server Error';
    } else if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource';
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.error(error);

  return (
    <div className={styles.errorPage}>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
