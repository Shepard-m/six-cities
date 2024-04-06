import { withHistory } from '../../utils/mock-component';
import { mockComment } from '../../utils/mocks';
import ReviewItem from './review-item';
import { render, screen } from '@testing-library/react';

describe('PlacesOption', () => {
  it('should return component PlacesOption', () => {
    const reviewsItemTestId = 'reviews-item';
    const reviewsItemNameTestId = 'reviews-item-name';
    const reviewsItemTextTestId = 'reviews-item-text';
    const starComponentTest = withHistory(<ReviewItem comment={mockComment} />);

    render(starComponentTest);

    expect(screen.getByTestId(reviewsItemTestId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewsItemNameTestId)).toHaveTextContent(mockComment.user.name);
    expect(screen.getByTestId(reviewsItemTextTestId)).toHaveTextContent(mockComment.comment);
  });
});
