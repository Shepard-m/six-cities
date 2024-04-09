import { render, screen } from '@testing-library/react';
import ButtonFavorite from './button-favorite';
import { mocksOfferPreviews } from '../../utils/mocks';
import { SizeOptionButtonFavorite } from '../../const';
import { withHistory } from '../../utils/mock-component';

describe('ButtonFavorite', () => {
  it('should return component ButtonFavorite without class: "place-card__bookmark-button--active"', () => {
    const buttonFavoriteTestId = 'button-favorite';
    const extraClass = 'place-card__bookmark-button--active';
    const componentButtonFavorite = withHistory(<ButtonFavorite offerId={mocksOfferPreviews.id} sizeOptionButtonFavorite={SizeOptionButtonFavorite.card} />);
    render(componentButtonFavorite);

    expect(screen.getByTestId(buttonFavoriteTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonFavoriteTestId)).not.toHaveClass(extraClass);
  });
});
