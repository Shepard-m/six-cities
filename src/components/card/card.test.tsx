import { render, screen } from '@testing-library/react';
import { OptionCard } from '../../const';
import Card from './card';
import { mocksOfferPreviews } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';

describe('Card', () => {
  it('should return favorites_card', () => {
    const onEventClick = vi.fn();
    const cardTestId = OptionCard.FAVORITES_CARD.classCard;

    render(
      withHistory(<Card offer={mocksOfferPreviews} optionCard={OptionCard.FAVORITES_CARD} handelPointCardMouseOver={onEventClick} />)
    );

    expect(screen.getByTestId(cardTestId)).toBeInTheDocument();
  });
  it('should return cities_card', () => {
    const onEventClick = vi.fn();
    const cardTestId = OptionCard.CITIES_CARD.classCard;

    render(
      withHistory(<Card offer={mocksOfferPreviews} optionCard={OptionCard.CITIES_CARD} handelPointCardMouseOver={onEventClick} />)
    );

    expect(screen.getByTestId(cardTestId)).toBeInTheDocument();
  });
});

