import { useRouteError } from 'react-router-dom';
import './error-page.css';

interface RouteError {
  data: string;
  error: {
    columnNumber: number;
    fileName: string;
    lineNumber: number;
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page" className="error-page">
      <h2>404</h2>
      <p>Sorry, this page doesn't exist</p>
    </div>
  );
}
