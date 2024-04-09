import { render, screen } from '@testing-library/react';
import { LocationCity } from '../../const';
import ListLocation from './list-location';

describe('ListLocation', () => {
  it('should return component ListLocation', () => {
    const onMockHandelClick = vi.fn();
    const locationListTestId = 'locations-list';

    render(<ListLocation listLocations={LocationCity} handleCurrentCityClick={onMockHandelClick} currentCity='Paris' />);

    expect(screen.getByTestId(locationListTestId)).toBeInTheDocument();
  });
});
