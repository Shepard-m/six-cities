import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction } from '../api-action';
import { Offer } from '../../types/offer';
import { RequestStatus } from '../../const';
import { fetchOfferNearbyAction } from '../api-action';
import { OfferPreviews } from '../../types/offer-preview';

type TInitialState = {
  offerStatus: string;
  nearby: OfferPreviews[];
  currentOffer: Offer | null;
}

const initialState: TInitialState = {
  offerStatus: RequestStatus.NONE,
  nearby: [],
  currentOffer: null,
};

const offerSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerStatus = RequestStatus.LOADING;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.offerStatus = RequestStatus.SUCCESS;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerStatus = RequestStatus.FAILED;
      })
      .addCase(fetchOfferNearbyAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  },
  initialState,
  name: 'offer',
  reducers: {
    clear(state) {
      state.currentOffer = null;
    },
    addOfferNearbyToFavorites: (state, action: PayloadAction<{ offerId: string; isFavorite: boolean }>) => {
      state.nearby.map((offer) => {
        if (offer.id === action.payload.offerId) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
    },
  },
  selectors: {
    currentOffer: (state: TInitialState) => state.currentOffer,
    nearby: (state: TInitialState) => state.nearby,
    offerStatus: (state: TInitialState) => state.offerStatus,
  }
});

const offerAction = { ...offerSlice.actions, fetchOfferAction };

const offerSelector = offerSlice.selectors;

export { offerAction, offerSelector, offerSlice };


