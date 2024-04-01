import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LocationCity, RequestStatus } from '../../const';
import { OfferPreviews } from '../../types/offer-preview';
import { sortingOffers } from '../../hooks/sort';
import { fetchOffersAction } from '../api-action';

type TInitialState = {
  city: string;
  offers: OfferPreviews[];
  initialOffers: OfferPreviews[];
  status: string;
  isOfferDataLoadingStatus: boolean;
}

const initialState: TInitialState = {
  city: LocationCity.PARIS,
  offers: [],
  initialOffers: [],
  status: RequestStatus.NONE,
  isOfferDataLoadingStatus: false,
};

const offersSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOfferDataLoadingStatus = true;
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOfferDataLoadingStatus = false;
        state.initialOffers = action.payload;
        state.offers = state.initialOffers.filter((offer) => offer.city.name === state.city);
        state.status = RequestStatus.SUCCESS;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.FAILED;
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
    },
  },
  selectors: {
    isOffersDataLoading: (state: TInitialState) => state.isOfferDataLoadingStatus,
    city: (state: TInitialState) => state.city,
    offers: (state: TInitialState) => state.offers,
    status: (state: TInitialState) => state.status,
    initialOffers: (state: TInitialState) => state.initialOffers,
  }
});

const offersAction = offersSlice.actions;

const offersSelectors = offersSlice.selectors;

export { offersAction, offersSlice, offersSelectors };
