import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { mocksOfferPreviews } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';

describe('MainEmpty', () => {
  it('should return component MainEmpty the class: "place-card__bookmark-button--active"', () => {
    const mainEmptyTestId = 'main-empty';
    const mainEmptyTextTestId = 'main-empty-text';
    const textMainEmpty = `We could not find any property available at the moment in ${mocksOfferPreviews.city.name}`;
    const componentButtonFavorite = withHistory(<MainEmpty currentCity={mocksOfferPreviews.city} />);
    render(componentButtonFavorite);

    expect(screen.getByTestId(mainEmptyTestId)).toBeInTheDocument();
    expect(screen.getByTestId(mainEmptyTextTestId)).toHaveTextContent(textMainEmpty);
  });
});
