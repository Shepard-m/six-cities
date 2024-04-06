import { OptionCard } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { mocksOfferPreviews } from '../../utils/mocks';
import ListCards from './list-cards';
import { render, screen } from '@testing-library/react';

describe('List-card', () => {
  it('should return List-card the class: citiesCard', () => {
    const onMockEventClick = vi.fn();
    const listCardTestId = 'list-component';
    const listCardComponentTestId = withHistory(<ListCards offers={[mocksOfferPreviews]} onListItemHover={onMockEventClick} extraClass={OptionCard.CITIES_CARD.classCard} />);

    render(listCardComponentTestId);

    expect(screen.getByTestId(listCardTestId)).toBeInTheDocument();
    expect(screen.getByTestId(listCardTestId)).toHaveClass(OptionCard.CITIES_CARD.classCard);
  });
  it('should return List-card the class: favoritesCard', () => {
    const onMockEventClick = vi.fn();
    const listCardTestId = 'list-component';
    const listCardComponentTestId = withHistory(<ListCards offers={[mocksOfferPreviews]} onListItemHover={onMockEventClick} extraClass={OptionCard.FAVORITES_CARD.classCard} />);

    render(listCardComponentTestId);

    expect(screen.getByTestId(listCardTestId)).toBeInTheDocument();
    expect(screen.getByTestId(listCardTestId)).toHaveClass(OptionCard.FAVORITES_CARD.classCard);
  });
});
