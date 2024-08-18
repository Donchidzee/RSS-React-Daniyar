import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './routes/App.tsx';
import ReactHookForm from './routes/ReactHookForm.tsx';
import UncontrolledComponentsForm from './routes/UncontrolledComponentsForm.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'react-hook-form',
    element: <ReactHookForm />,
  },
  {
    path: 'uncontrolled-components-form',
    element: <UncontrolledComponentsForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
