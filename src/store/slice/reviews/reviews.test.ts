import { describe } from 'vitest';
import { RequestStatus } from '../../../const';
import { reviewsSlice } from './reviews';
import { fetchCommentAction, fetchCommentsAction } from '../../api-action';
import { mockComment, mockFetchCommentUser } from '../../../utils/mocks';

describe('Reviews Slice', () => {
  const initialState = {
    reviewsStatus: RequestStatus.NONE,
    comments: [],
  };

  it('should return reviewsStatus = loading when fetchCommentsAction.pending', () => {
    const expectState = {
      reviewsStatus: RequestStatus.LOADING,
      comments: [],
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentsAction.pending('', ''));

    expect(result).toEqual(expectState);
  });
  it('should return reviewsStatus = SUCCESS when fetchCommentsAction.fulfilled', () => {
    const expectState = {
      reviewsStatus: RequestStatus.SUCCESS,
      comments: [mockComment],
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentsAction.fulfilled([mockComment], '', ''));

    expect(result).toEqual(expectState);
  });
  it('should return reviewsStatus = FAILED when fetchCommentsAction.rejected', () => {
    const expectState = {
      reviewsStatus: RequestStatus.FAILED,
      comments: [],
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentsAction.rejected(null, '', ''));

    expect(result).toEqual(expectState);
  });
  it('should return reviewsStatus = loading when fetchCommentAction.pending', () => {
    const expectState = {
      reviewsStatus: RequestStatus.LOADING,
      comments: [],
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentAction.pending('', mockFetchCommentUser));

    expect(result).toEqual(expectState);
  });
  it('should return reviewsStatus = SUCCESS when fetchCommentAction.fulfilled', () => {
    const expectState = {
      reviewsStatus: RequestStatus.SUCCESS,
      comments: [mockComment],
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentAction.fulfilled(mockComment, '', mockFetchCommentUser));

    expect(result).toEqual(expectState);
  });
  it('should return reviewsStatus = FAILED when fetchCommentAction.rejected', () => {
    const expectState = {
      reviewsStatus: RequestStatus.FAILED,
      comments: [],
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentAction.rejected(null, '', mockFetchCommentUser));

    expect(result).toEqual(expectState);
  });
});
