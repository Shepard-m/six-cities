import { render, screen } from '@testing-library/react';
import OfferInside from './offer-inside';
import { withHistory } from '../../utils/mock-component';

describe('OfferInside', () => {
  it('should return component OfferInside', () => {
    const offerInsideTestId = 'offer-inside';
    const offerInsideText = 'wifi';
    const componentButtonFavorite = withHistory(<OfferInside textOffer={offerInsideText} />);
    render(componentButtonFavorite);

    expect(screen.getByTestId(offerInsideTestId)).toBeInTheDocument();
    expect(screen.getByTestId(offerInsideTestId)).toHaveTextContent(offerInsideText);
  });
});
