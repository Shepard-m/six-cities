import { withHistory } from '../../utils/mock-component';
import FavoritePage from './favorite-page';
import { render, screen } from '@testing-library/react';

describe('FavoritePage', () => {
  it('should return component favoritePage', () => {
    const favoritePageTest = withHistory(<FavoritePage />);
    render(favoritePageTest);
    const favoritePageTestId = screen.getByTestId('favorite-page');

    expect(favoritePageTestId).toBeInTheDocument();
  });
});
