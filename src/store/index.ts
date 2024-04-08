import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import rootReducer from './rootReduser';
import { State } from '../types/state';

const api = createAPI();

export function setupStore(preloadedState?: Partial<State>) {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
    reducer: rootReducer,
    preloadedState,
  });
}

const store = setupStore();

export { store };
