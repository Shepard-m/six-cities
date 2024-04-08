import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LocationCity, RequestStatus } from '../../../const';
import { OfferPreviews } from '../../../types/offer-preview';
import { sortingOffers } from '../../../hooks/sort';
import { fetchOffersAction } from '../../api-action';

type TInitialState = {
  city: string;
  offers: OfferPreviews[];
  initialOffers: OfferPreviews[];
  offersStatus: string;
}

const initialState: TInitialState = {
  city: LocationCity.PARIS,
  offers: [],
  initialOffers: [],
  offersStatus: RequestStatus.NONE,
};

const offersSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {

        state.offersStatus = RequestStatus.LOADING;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.initialOffers = action.payload;
        state.offers = state.initialOffers.filter((offer) => offer.city.name === state.city);
        state.offersStatus = RequestStatus.SUCCESS;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersStatus = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'offers',
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      state.offers = state.initialOffers.filter((offer) => offer.city.name === state.city);
    },
    sortOffer: (state, action: PayloadAction<string>) => {
      state.offers = sortingOffers(action.payload, state.offers, state.initialOffers);
    },
    loadOffer: (state, action: PayloadAction<OfferPreviews[]>) => {
      state.initialOffers = action.payload;
      state.offers = state.initialOffers.filter((offer) => offer.city.name === state.city);
    },
    addOfferToFavorites: (state, action: PayloadAction<{ offerId: string; isFavorite: boolean }>) => {
      state.offers.map((offer) => {
        if (offer.id === action.payload.offerId) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
      state.initialOffers.map((offer) => {
        if (offer.id === action.payload.offerId) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
    },
  },
  selectors: {
    city: (state: TInitialState) => state.city,
    offers: (state: TInitialState) => state.offers,
    offersStatus: (state: TInitialState) => state.offersStatus,
    initialOffers: (state: TInitialState) => state.initialOffers,
  }
});

const offersAction = offersSlice.actions;

const offersSelectors = offersSlice.selectors;

export { offersAction, offersSlice, offersSelectors };
