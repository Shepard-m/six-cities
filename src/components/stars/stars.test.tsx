import { withHistory } from '../../utils/mock-component';
import Stars from './stars';
import { render, screen } from '@testing-library/react';

describe('Stars', () => {
  it('should return component stars', () => {
    const onMockEventClick = vi.fn();
    const starTestId = 'stars';
    const starComponentTest = withHistory(<Stars onChooseRating={onMockEventClick} rating={5} />);

    render(starComponentTest);

    expect(screen.getByTestId(starTestId)).toBeInTheDocument();
  });
});
