import { createSlice } from '@reduxjs/toolkit';
import { fetchCommentsAction, fetchCommentAction } from '../api-action';
import { RequestStatus } from '../../const';
import { Comment } from '../../types/comment';

type TInitialState = {
  status: string;
  isOfferDataLoadingStatus: boolean;
  comments: Comment[];
}

const initialState: TInitialState = {
  status: RequestStatus.NONE,
  isOfferDataLoadingStatus: false,
  comments: [],
};

const reviewsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.isOfferDataLoadingStatus = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.FAILED;
      })
      .addCase(fetchCommentAction.pending, (state) => {
        state.isOfferDataLoadingStatus = true;
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.SUCCESS;
        state.comments.push(action.payload);
      })
      .addCase(fetchCommentAction.rejected, (state) => {
        state.isOfferDataLoadingStatus = false;
        state.status = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'reviews',
  reducers: {
    clear(state) {
      state.comments = [];
    }
  },
  selectors: {
    comments: (state: TInitialState) => state.comments,
  }
});

const reviewsAction = { ...reviewsSlice.actions, fetchCommentsAction };

const reviewsSelector = reviewsSlice.selectors;

export { reviewsAction, reviewsSelector, reviewsSlice };
