import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import rootReducer from '../rootReduser';
import { userAction } from '../slice/user/user';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === userAction.redirectToRoute.type) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
