import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';
import { redirectToRoute } from '../action';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === redirectToRoute.type) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };