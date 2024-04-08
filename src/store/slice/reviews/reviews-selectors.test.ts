import { RequestStatus } from '../../../const';
import { reviewsSelector, reviewsSlice } from './reviews';

describe('Reviews Selectors', () => {
  const initialState = {
    [reviewsSlice.name]: {
      reviewsStatus: RequestStatus.NONE,
      comments: [],
    }
  };
  it('should return comments when called comments', () => {
    const { comments } = initialState[reviewsSlice.name];

    const result = reviewsSelector.comments(initialState);

    expect(result).toBe(comments);
  });
  it('should return reviewsStatus when called reviewsStatus', () => {
    const { reviewsStatus } = initialState[reviewsSlice.name];

    const result = reviewsSelector.reviewsStatus(initialState);

    expect(result).toBe(reviewsStatus);
  });
});

