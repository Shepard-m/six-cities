import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { TUser } from '../../types/user';

type TInitialState = {
  status: string;
  isUserDataLoadingStatus: boolean;
  authorizationStatus: string;
  dataUser: TUser | null;
}

const initialState: TInitialState = {
  status: RequestStatus.NONE,
  authorizationStatus: AuthorizationStatus.UN_KNOWN,
  isUserDataLoadingStatus: false,
  dataUser: null,
};

const userSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isUserDataLoadingStatus = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isUserDataLoadingStatus = false;
      })
      .addCase(logoutAction.pending, (state) => {
        state.isUserDataLoadingStatus = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isUserDataLoadingStatus = false;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.dataUser = null;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.isUserDataLoadingStatus = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isUserDataLoadingStatus = false;
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.dataUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isUserDataLoadingStatus = false;
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
    dataUser: (state: TInitialState) => state.dataUser,
    authorizationStatus: (state: TInitialState) => state.authorizationStatus,
  }
});

const userAction = userSlice.actions;

const userSelector = userSlice.selectors;

export { userAction, userSelector, userSlice };


