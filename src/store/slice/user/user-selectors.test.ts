import { AuthorizationStatus, RequestStatus } from '../../../const';
import { userSelector, userSlice } from './user';

describe('User Selectors', () => {
  const initialState = {
    [userSlice.name]: {
      userStatus: RequestStatus.NONE,
      authorizationStatus: AuthorizationStatus.UN_KNOWN,
      dataUser: null,
    }
  };
  it('should return comments when called selectors comments', () => {
    const { dataUser } = initialState[userSlice.name];

    const result = userSelector.dataUser(initialState);

    expect(result).toBe(dataUser);
  });
  it('should return userStatus when called selectors userStatus', () => {
    const { userStatus } = initialState[userSlice.name];

    const result = userSelector.userStatus(initialState);

    expect(result).toBe(userStatus);
  });
  it('should return authorizationStatus when called selectors authorizationStatus', () => {
    const { authorizationStatus } = initialState[userSlice.name];

    const result = userSelector.authorizationStatus(initialState);

    expect(result).toBe(authorizationStatus);
  });
});
