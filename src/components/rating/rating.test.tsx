import { OptionCard } from '../../const';
import { withHistory } from '../../utils/mock-component';
import Rating from './rating';
import { render, screen } from '@testing-library/react';

describe('Rating', () => {
  it('should return component Rating the rating-value', () => {
    const ratingTestId = 'rating';
    const ratingCountTestId = 'rating-count';
    const starComponentTest = withHistory(<Rating ratingClass={OptionCard.CITIES_CARD.classCard} isRatingValue rating={5} />);

    render(starComponentTest);

    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingCountTestId)).toHaveTextContent('5');
  });
  it('should return component PlacesOptions without rating-value', () => {
    const ratingTestId = 'rating';
    const ratingCountTestId = 'rating-count';
    const starComponentTest = withHistory(<Rating ratingClass={OptionCard.CITIES_CARD.classCard} isRatingValue={false} rating={5} />);

    render(starComponentTest);

    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
  });

});
