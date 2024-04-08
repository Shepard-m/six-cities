import { render, screen } from '@testing-library/react';
import Location from './location';

describe('Location', () => {
  it('should return component Location the class: "tabs__item--active"', () => {
    const onMockHandelClick = vi.fn();
    const locationLinkTestId = 'location-link';
    const locationTestId = 'location';
    const city = 'City';
    const extraClass = 'tabs__item--active';

    render(<Location isActive city={city} handleCurrentCityClick={onMockHandelClick} />);

    expect(screen.getByTestId(locationTestId)).toBeInTheDocument();
    expect(screen.getByTestId(locationLinkTestId)).toHaveClass(extraClass);
  });
  it('should return component Location without class: "tabs__item--active"', () => {
    const onMockHandelClick = vi.fn();
    const locationLinkTestId = 'location-link';
    const locationTestId = 'location';
    const city = 'City';
    const extraClass = 'tabs__item--active';

    render(<Location isActive={false} city={city} handleCurrentCityClick={onMockHandelClick} />);

    expect(screen.getByTestId(locationTestId)).toBeInTheDocument();
    expect(screen.getByTestId(locationLinkTestId)).not.toHaveClass(extraClass);
  });
});
