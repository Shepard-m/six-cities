import { waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import App from './app';
import { screen } from '@testing-library/react';
import { AppRoute } from '../../const';

describe('App', () => {
  it('should forward to the main page', async () => {
    const mainPageTestId = 'main-page';
    renderWithRouterAndRedux(<App />, { route: AppRoute.Main });

    await waitFor(() => expect(screen.getByTestId(mainPageTestId)).toBeInTheDocument());

  });
  it('should forward to the login-page', async () => {
    const mainPageTestId = 'login-page';
    renderWithRouterAndRedux(<App />, { route: AppRoute.Login });

    await waitFor(() => expect(screen.getByTestId(mainPageTestId)).toBeInTheDocument());

  });
});
