import { withHistory } from '../../utils/mock-component';
import Star from './star';
import { render, screen } from '@testing-library/react';

describe('Star', () => {
  it('should return component star', () => {
    const onMockEventClick = vi.fn();
    const ratingInputTestId = 'rating-input';
    const ratingLabelTestId = 'rating-label';
    const starComponentTest = withHistory(<Star onChooseRating={onMockEventClick} checkedStar={5} countStar={5} />);
    render(starComponentTest);

    expect(screen.getByTestId(ratingInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingLabelTestId)).toBeInTheDocument();
  });
});
