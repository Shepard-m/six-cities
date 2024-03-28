import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteAction } from '../api-action';
import { OfferPreviews } from '../../types/offer-preview';

type TInitialState = {
  isOfferDataLoadingStatus: boolean;
  favorite: OfferPreviews[];
}

const initialState: TInitialState = {
  isOfferDataLoadingStatus: false,
  favorite: [],
};

const favoriteSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isOfferDataLoadingStatus = true;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
        state.isOfferDataLoadingStatus = false;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isOfferDataLoadingStatus = false;
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
  }
});

const favoriteAction = favoriteSlice.actions;
const favoriteSelectors = favoriteSlice.selectors;

export { favoriteAction, favoriteSlice, favoriteSelectors };
