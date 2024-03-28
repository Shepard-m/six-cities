import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction } from '../api-action';
import { Offer } from '../../types/offer';
import { RequestStatus } from '../../const';
import { fetchOfferNearbyAction } from '../api-action';
import { fetchCommentAction } from '../api-action';
import { OfferPreviews } from '../../types/offer-preview';

type TInitialState = {
  status: string;
  isOfferDataLoadingStatus: boolean;
  nearby: OfferPreviews[];
  currentOffer: Offer | null;
}

const initialState: TInitialState = {
  status: RequestStatus.NONE,
  isOfferDataLoadingStatus: false,
  nearby: [],
  currentOffer: null,
};

const offerSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoadingStatus = true;
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferDataLoadingStatus = false;
        state.currentOffer = action.payload;
        state.status = RequestStatus.SUCCESS;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.FAILED;
      })
      .addCase(fetchCommentAction.pending, (state) => {
        state.isOfferDataLoadingStatus = true;
      })
      .addCase(fetchCommentAction.fulfilled, (state) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.SUCCESS;
      })
      .addCase(fetchCommentAction.rejected, (state) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.FAILED;
      })
      .addCase(fetchOfferNearbyAction.fulfilled, (state, action) => {
        state.isOfferDataLoadingStatus = false;
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
    isOfferDataLoadingStatus: (state: TInitialState) => state.isOfferDataLoadingStatus,
    status: (state: TInitialState) => state.status,
  }
});

const offerAction = { ...offerSlice.actions, fetchOfferAction };

const offerSelector = offerSlice.selectors;

export { offerAction, offerSelector, offerSlice };


