import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< Updated upstream
=======
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ToastContainer />
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
