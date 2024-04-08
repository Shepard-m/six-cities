import { RequestStatus } from '../../../const';
import { mocksOfferPreviews } from '../../../utils/mocks';
import { changeFavoriteAction, fetchFavoriteAction } from '../../api-action';
import { favoriteSlice, favoriteAction } from './favorite';

describe('Favorite Slice', () => {
  const initialState = {
    statusFavorite: RequestStatus.NONE,
    favorite: [],
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = favoriteSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return statusFavorite = loading when fetchFavoriteAction.pending', () => {
    const expectedState = {
      statusFavorite: RequestStatus.LOADING,
      favorite: [],
    };

    const result = favoriteSlice.reducer(initialState, fetchFavoriteAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return statusFavorite = success and array favorite when fetchFavoriteAction.fulfilled', () => {
    const mocksFavorites = [mocksOfferPreviews];
    const expectedState = {
      statusFavorite: RequestStatus.SUCCESS,
      favorite: [mocksOfferPreviews],
    };

    const result = favoriteSlice.reducer(initialState, fetchFavoriteAction.fulfilled(mocksFavorites, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return statusFavorite = failed and array favorite when fetchFavoriteAction.fulfilled', () => {
    const expectedState = {
      statusFavorite: RequestStatus.FAILED,
      favorite: [],
    };

    const result = favoriteSlice.reducer(initialState, fetchFavoriteAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return statusFavorite = loading when changeFavoriteAction.pending', () => {
    const expectedState = {
      statusFavorite: RequestStatus.LOADING,
      favorite: [],
    };

    const result = favoriteSlice.reducer(initialState, changeFavoriteAction.pending('', { offerId: '', status: 1 }));

    expect(result).toEqual(expectedState);
  });

  it('should return statusFavorite = SUCCESS when changeFavoriteAction.fulfilled', () => {
    const expectedState = {
      statusFavorite: RequestStatus.SUCCESS,
      favorite: [],
    };

    const result = favoriteSlice.reducer(initialState, changeFavoriteAction.fulfilled(mocksOfferPreviews, '', { offerId: mocksOfferPreviews.id, status: 1 }, undefined));

    expect(result).toEqual(expectedState);
  });

  it('should return statusFavorite = SUCCESS when changeFavoriteAction.FAILED. Checking for additions', () => {
    const expectedState = {
      statusFavorite: RequestStatus.FAILED,
      favorite: [],
    };

    const result = favoriteSlice.reducer(initialState, changeFavoriteAction.rejected(null, '', { offerId: mocksOfferPreviews.id, status: 1 }, undefined));

    expect(result).toEqual(expectedState);
  });

  it('should add a sentence to favorites when in progress addOfferToFavorites.', () => {
    const expectedState = {
      statusFavorite: RequestStatus.NONE,
      favorite: [mocksOfferPreviews],
    };

    const result = favoriteSlice.reducer(initialState, favoriteAction.addOfferToFavorites({ offer: mocksOfferPreviews, isFavorite: true }));

    expect(result).toEqual(expectedState);
  });
  it('should delete the sentence from favorites when in progress addOfferToFavorites.', () => {
    const favoriteState = {
      statusFavorite: RequestStatus.NONE,
      favorite: [mocksOfferPreviews],
    };
    const expectedState = {
      statusFavorite: RequestStatus.NONE,
      favorite: [],
    };

    const result = favoriteSlice.reducer(favoriteState, favoriteAction.addOfferToFavorites({ offer: mocksOfferPreviews, isFavorite: false }));

    expect(result).toEqual(expectedState);
  });
});
