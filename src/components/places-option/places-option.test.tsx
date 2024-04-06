import { withHistory } from '../../utils/mock-component';
import PlacesOption from './places-option';
import { render, screen } from '@testing-library/react';

describe('PlacesOption', () => {
  it('should return component PlacesOption', () => {
    const onMockEventClick = vi.fn();
    const placesOptionTestId = 'places-option';
    const starComponentTest = withHistory(<PlacesOption handelSortOfferClick={onMockEventClick} place='Price: low to high' />);

    render(starComponentTest);

    expect(screen.getByTestId(placesOptionTestId)).toBeInTheDocument();
  });
});
