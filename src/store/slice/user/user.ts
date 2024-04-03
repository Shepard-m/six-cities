import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../../const';
import { checkAuthAction, loginAction, logoutAction } from '../../api-action';
import { TUser } from '../../../types/user';

type TInitialState = {
  userStatus: string;
  authorizationStatus: string;
  dataUser: TUser | null;
}

const initialState: TInitialState = {
  userStatus: RequestStatus.NONE,
  authorizationStatus: AuthorizationStatus.UN_KNOWN,
  dataUser: null,
};

const userSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.userStatus = RequestStatus.LOADING;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.userStatus = RequestStatus.SUCCESS;
      })
      .addCase(logoutAction.pending, (state) => {
        state.userStatus = RequestStatus.LOADING;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.userStatus = RequestStatus.SUCCESS;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.dataUser = null;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.userStatus = RequestStatus.LOADING;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userStatus = RequestStatus.SUCCESS;
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.dataUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.userStatus = RequestStatus.FAILED;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
  initialState,
  name: 'user',
  reducers: {
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {

    },
  },
  selectors: {
    dataUser: (state: Pick<TInitialState, 'dataUser'>) => state.dataUser,
    authorizationStatus: (state: Pick<TInitialState, 'authorizationStatus'>) => state.authorizationStatus,
    userStatus: (state: Pick<TInitialState, 'userStatus'>) => state.userStatus,
  }
});

const userAction = userSlice.actions;

const userSelector = userSlice.selectors;

export { userAction, userSelector, userSlice };


