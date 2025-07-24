import { useRouteError, isRouteErrorResponse } from 'react-router';

export default function ErorPage() {
  const error = useRouteError();

  let title = 'Error occured';
  let message = 'Something wend wrong';

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
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
