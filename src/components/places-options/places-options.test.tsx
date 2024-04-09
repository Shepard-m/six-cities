import { withHistory } from '../../utils/mock-component';
import PlacesOptions from './places-options';
import { render, screen } from '@testing-library/react';

describe('PlacesOptions', () => {
  it('should return component PlacesOptions the class: "places__options--opened"', () => {
    const onMockEventClick = vi.fn();
    const placesOptionsTestId = 'places-options';
    const starComponentTest = withHistory(<PlacesOptions handelSortOfferClick={onMockEventClick} isOpen />);

    render(starComponentTest);

    expect(screen.getByTestId(placesOptionsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(placesOptionsTestId)).toHaveClass('places__options--opened');
  });
  it('should return component PlacesOptions without class: "places__options--opened"', () => {
    const onMockEventClick = vi.fn();
    const placesOptionsTestId = 'places-options';
    const starComponentTest = withHistory(<PlacesOptions handelSortOfferClick={onMockEventClick} isOpen={false} />);

    render(starComponentTest);

    expect(screen.getByTestId(placesOptionsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(placesOptionsTestId)).not.toHaveClass('places__options--opened');
  });
});

