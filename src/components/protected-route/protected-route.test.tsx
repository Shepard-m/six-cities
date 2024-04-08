import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { screen } from '@testing-library/react';
import App from '../app/app';
import { AppRoute } from '../../const';

describe('Protected route', () => {
  it('should forward to the page login, when user not authorized', () => {
    const favoritesEmptyTestId = 'favorites-empty';
    const loginPageTestId = 'login-page';
    renderWithRouterAndRedux(<App />, { route: AppRoute.Favorites });

    expect(screen.queryByTestId(favoritesEmptyTestId)).not.toBeInTheDocument();
    expect(screen.getByTestId(loginPageTestId)).toBeInTheDocument();
  });
});
