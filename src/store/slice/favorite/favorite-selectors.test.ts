import { RequestStatus } from '../../../const';
import { mocksOfferPreviews } from '../../../utils/mocks';
import { favoriteSelectors, favoriteSlice } from './favorite';

describe('Favorite selectors', () => {
  const initialState = {
    [favoriteSlice.name]: {
      statusFavorite: RequestStatus.NONE,
      favorite: [],
    }
  };
  it('should return empty favorites', () => {
    const { favorite } = initialState[favoriteSlice.name];

    const result = favoriteSelectors.favorite(initialState);

    expect(result).toBe(favorite);
  });
  it('should return favorites', () => {
    const state = {
      [favoriteSlice.name]: {
        statusFavorite: RequestStatus.NONE,
        favorite: [mocksOfferPreviews],
      }
    };
    const { favorite } = state[favoriteSlice.name];

    const result = favoriteSelectors.favorite(state);

    expect(result).toEqual(favorite);
  });

  it('should return statusFavorite', () => {
    const { statusFavorite } = initialState[favoriteSlice.name];

    const result = favoriteSelectors.statusFavorite(initialState);

    expect(result).toBe(statusFavorite);
  });
});
