import { combineReducers } from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers/offers';
import { offerSlice } from './slice/offer/offer';
import { favoriteSlice } from './slice/favorite/favorite';
import { reviewsSlice } from './slice/reviews/reviews';
import { userSlice } from './slice/user/user';

const rootReducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer
});

export default rootReducer;
