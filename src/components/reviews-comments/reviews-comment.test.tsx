import { withHistory } from '../../utils/mock-component';
import { mockComment } from '../../utils/mocks';
import ReviewsComments from './reviews-comments';
import { render, screen } from '@testing-library/react';

describe('ReviewsComments', () => {
  it('should return component ReviewsComments', () => {
    const listCardTestId = 'reviews-comments';
    const listCardComponentTestId = withHistory(<ReviewsComments comments={[mockComment]} />);

    render(listCardComponentTestId);

    expect(screen.getByTestId(listCardTestId)).toBeInTheDocument();
  });
});
