import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import Map from './map';
import { mocksOfferPreviews } from '../../utils/mocks';

describe('Map', () => {
  it('should return component Map', () => {
    const mapTestId = 'map';
    const footerComponent = withHistory(<Map city={mocksOfferPreviews.city} offers={[mocksOfferPreviews]} selectedOffer={mocksOfferPreviews} />);

    render(footerComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
