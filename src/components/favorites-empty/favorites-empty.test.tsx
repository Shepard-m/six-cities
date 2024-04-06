import FavoritesEmpty from './favorites-empty';
import { render, screen } from '@testing-library/react';

describe('Favorites-empty', () => {
  it('should return component favorites-empty', () => {
    const favoritesEmptyTestId = 'favorites-empty';

    render(<FavoritesEmpty />);

    expect(screen.getByTestId(favoritesEmptyTestId)).toBeInTheDocument();
  });
});
