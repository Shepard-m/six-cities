import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { setupStore, store } from '../store';
import { PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { State } from '../types/state';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        <Provider store={store}>
          {component}
        </Provider>
      </HelmetProvider>
    </HistoryRouter>
  );
}

export function renderWithRouterAndRedux(component: ReactElement, { route = '/', preloaderState = {}, store: Store = setupStore(preloaderState) }: { route?: string; store?: typeof configureStore; preloaderState?: Partial<State> }) {
  window.history.pushState({}, document.title, route);
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <HelmetProvider>
        <BrowserRouter history={createMemoryHistory({ initialEntries: [route] })}>
          <Provider store={Store}>
            {children}
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    );
  }

  return { store: Store, ...render(component, { wrapper: Wrapper }) };
}
