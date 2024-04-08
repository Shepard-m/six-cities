import FavoriteItems from './favorite-items';
import { render, screen } from '@testing-library/react';

describe('Favorites-items', () => {
  it('should return component favorites-items', () => {
    const childrenTest = <span>Test</span>;
    const mockLocation = 'Paris';
    const favoriteItemsTestId = 'favorite-items';

    render(
      <FavoriteItems city={mockLocation}>
        {childrenTest}
      </FavoriteItems>
    );

    expect(screen.getByTestId(favoriteItemsTestId)).toBeInTheDocument();
    expect(screen.getByText(mockLocation)).toBeInTheDocument();
  });
});
