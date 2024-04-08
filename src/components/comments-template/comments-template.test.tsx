import { withHistory } from '../../utils/mock-component';
import { mockOffer } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import CommentsTemplate from './comments-template';
import { render, screen } from '@testing-library/react';

describe('CommentsTemplate', () => {
  it('should return CommentsTemplate enter input fields a', async () => {
    const listCardComponentTestId = withHistory(<CommentsTemplate offerId={mockOffer.id} />);
    render(listCardComponentTestId);

    const reviewsTextTestId = screen.getByTestId('reviews-text');
    const reviewsButtonTestId = screen.getByTestId('reviews-button');
    const mockText = 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.';

    await userEvent.type(
      reviewsTextTestId,
      mockText
    );


    expect(reviewsTextTestId).toBeInTheDocument();
    expect(reviewsTextTestId).toHaveValue(mockText);
    expect(reviewsButtonTestId).toBeDisabled();
  });

});
