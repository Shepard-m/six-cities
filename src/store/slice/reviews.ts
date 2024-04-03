import { createSlice } from '@reduxjs/toolkit';
import { fetchCommentsAction, fetchCommentAction } from '../api-action';
import { RequestStatus } from '../../const';
import { Comment } from '../../types/comment';

type TInitialState = {
  reviewsStatus: string;
  comments: Comment[];
}

const initialState: TInitialState = {
  reviewsStatus: RequestStatus.NONE,
  comments: [],
};

const reviewsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.reviewsStatus = RequestStatus.LOADING;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.reviewsStatus = RequestStatus.SUCCESS;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.reviewsStatus = RequestStatus.FAILED;
      })
      .addCase(fetchCommentAction.pending, (state) => {
        state.reviewsStatus = RequestStatus.LOADING;
      })
      .addCase(fetchCommentAction.fulfilled, (state, action) => {
        state.reviewsStatus = RequestStatus.SUCCESS;
        state.comments.push(action.payload);
      })
      .addCase(fetchCommentAction.rejected, (state) => {
        state.reviewsStatus = RequestStatus.FAILED;
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
    reviewsStatus: (state: TInitialState) => state.reviewsStatus,
  }
});

const reviewsAction = { ...reviewsSlice.actions, fetchCommentsAction };

const reviewsSelector = reviewsSlice.selectors;

export { reviewsAction, reviewsSelector, reviewsSlice };
