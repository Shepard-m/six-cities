import { ListSort } from '../const';
import { listMocksOffersPreviews } from '../utils/mocks';
import { sortingOffers } from './sort';

describe('Check hooks sort', () => {
  it('should return sorting array offers by price to high', () => {
    const mockSortOffers = listMocksOffersPreviews.filter((offer) => offer.city.name === 'Paris');

    const sortOffers = sortingOffers(ListSort.SORT_POPULAR, listMocksOffersPreviews, listMocksOffersPreviews);

    expect(mockSortOffers).toEqual(sortOffers);
  });
});
