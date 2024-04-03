import { AuthorizationStatus, RequestStatus } from '../../../const';
import { mockUser, mockUserData } from '../../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../../api-action';
import { userSlice } from './user';

describe('User Slice', () => {
  const initialState = {
    userStatus: RequestStatus.NONE,
    authorizationStatus: AuthorizationStatus.UN_KNOWN,
    dataUser: null,
  };
  it('should return RequestStatus = LOADING when loginAction.pending', () => {
    const expectState = {
      userStatus: RequestStatus.LOADING,
      authorizationStatus: AuthorizationStatus.UN_KNOWN,
      dataUser: null,
    };

    const result = userSlice.reducer(initialState, loginAction.pending('', mockUser));

    expect(result).toEqual(expectState);
  });
  it('should return RequestStatus = SUCCESS when loginAction.fulfilled', () => {
    const expectState = {
      userStatus: RequestStatus.SUCCESS,
      authorizationStatus: AuthorizationStatus.UN_KNOWN,
      dataUser: null,
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled('', '', mockUser));

    expect(result).toEqual(expectState);
  });
  it('should return RequestStatus = LOADING when logoutAction.pending', () => {
    const expectState = {
      userStatus: RequestStatus.LOADING,
      authorizationStatus: AuthorizationStatus.UN_KNOWN,
      dataUser: null,
    };

    const result = userSlice.reducer(initialState, logoutAction.pending('', undefined));

    expect(result).toEqual(expectState);
  });
  it('should return RequestStatus = SUCCESS and authorizationStatus = NO_AUTH when logoutAction.fulfilled', () => {
    const expectState = {
      userStatus: RequestStatus.SUCCESS,
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      dataUser: null,
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled('', '', undefined));

    expect(result).toEqual(expectState);
  });
  it('should return RequestStatus = LOADING when checkAuthAction.pending', () => {
    const expectState = {
      userStatus: RequestStatus.LOADING,
      authorizationStatus: AuthorizationStatus.UN_KNOWN,
      dataUser: null,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.pending('', undefined));

    expect(result).toEqual(expectState);
  });
  it('should return RequestStatus = SUCCESS and dataUser, authorizationStatus = AUTH when checkAuthAction.fulfilled', () => {
    const expectState = {
      userStatus: RequestStatus.SUCCESS,
      authorizationStatus: AuthorizationStatus.AUTH,
      dataUser: mockUserData,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.fulfilled(mockUserData, '', undefined));

    expect(result).toEqual(expectState);
  });
  it('should return RequestStatus = FAILED and authorizationStatus = NO_AUTH when checkAuthAction.rejected', () => {
    const expectState = {
      userStatus: RequestStatus.FAILED,
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      dataUser: null,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.rejected(null, '', undefined));

    expect(result).toEqual(expectState);
  });
});
