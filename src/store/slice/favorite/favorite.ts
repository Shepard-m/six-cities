import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { changeFavoriteAction, fetchFavoriteAction } from '../../api-action';
import { RequestStatus } from '../../../const';
import { OfferPreviews } from '../../../types/offer-preview';

type TInitialState = {
  statusFavorite: string;
  favorite: OfferPreviews[];
}

const initialState: TInitialState = {
  statusFavorite: RequestStatus.NONE,
  favorite: [],
};

const favoriteSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(changeFavoriteAction.pending, (state) => {
        state.statusFavorite = RequestStatus.LOADING;
      })
      .addCase(changeFavoriteAction.fulfilled, (state) => {
        state.statusFavorite = RequestStatus.SUCCESS;
      })
      .addCase(changeFavoriteAction.rejected, (state) => {
        state.statusFavorite = RequestStatus.FAILED;
      })
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.statusFavorite = RequestStatus.LOADING;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
        state.statusFavorite = RequestStatus.SUCCESS;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.statusFavorite = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'favorite',
  reducers: {
    addOfferToFavorites: (state, action: PayloadAction<{ offer: OfferPreviews; isFavorite: boolean }>) => {
      if (action.payload.isFavorite === true) {
        state.favorite.push(action.payload.offer);
        return;
      }

      state.favorite = [...state.favorite.filter((offer) => offer.id !== action.payload.offer.id)];
    },
  },
  selectors: {
    favorite: (state) => state.favorite,
    statusFavorite: (state) => state.statusFavorite,
  }
});

const favoriteAction = favoriteSlice.actions;
const favoriteSelectors = favoriteSlice.selectors;

export { favoriteAction, favoriteSlice, favoriteSelectors };
