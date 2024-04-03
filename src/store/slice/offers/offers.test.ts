import { LocationCity, RequestStatus } from '../../../const';
import { sortingOffers } from '../../../hooks/sort';
import { listMocksOffersPreviews } from '../../../utils/mocks';
import { fetchOffersAction } from '../../api-action';
import { offersAction, offersSlice } from './offers';

describe('Offers Slice', () => {
  const initialState = {
    city: LocationCity.PARIS,
    offers: [],
    initialOffers: [],
    offersStatus: RequestStatus.NONE,
  };

  const filledState = {
    city: LocationCity.PARIS,
    offers: listMocksOffersPreviews.filter((offer) => offer.city.name === initialState.city),
    initialOffers: listMocksOffersPreviews,
    offersStatus: RequestStatus.NONE,
  };

  it('should return emptyState with empty action', () => {
    const emptyAction = { type: '' };

    const result = offersSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });
  it('should return offersStatus = LOADING when fetchOffersAction.pending', () => {

    const expectedState = {
      city: LocationCity.PARIS,
      offers: [],
      initialOffers: [],
      offersStatus: RequestStatus.LOADING,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return offersStatus = SUCCESS and offers, initialOffers when fetchOffersAction.fulfilled', () => {
    const expectedState = {
      city: LocationCity.PARIS,
      initialOffers: listMocksOffersPreviews,
      offers: listMocksOffersPreviews.filter((offer) => offer.city.name === initialState.city),
      offersStatus: RequestStatus.SUCCESS,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.fulfilled(listMocksOffersPreviews, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return offersStatus = FAILED when fetchOffersAction.rejected', () => {
    const expectedState = {
      city: LocationCity.PARIS,
      offers: [],
      initialOffers: [],
      offersStatus: RequestStatus.FAILED,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return city and filtered offers when action selectCity', () => {
    const expectedState = {
      city: LocationCity.AMSTERDAM,
      offers: [],
      initialOffers: [],
      offersStatus: RequestStatus.NONE,
    };

    const result = offersSlice.reducer(initialState, offersAction.selectCity('Amsterdam'));

    expect(result).toEqual(expectedState);
  });

  it('should return filtered offers when action sortOffer', () => {
    const expectedState = {
      city: LocationCity.PARIS,
      offers: sortingOffers('Paris', filledState.offers, filledState.initialOffers),
      initialOffers: listMocksOffersPreviews,
      offersStatus: RequestStatus.NONE,
    };
    const result = offersSlice.reducer(filledState, offersAction.sortOffer('Paris'));

    expect(result).toEqual(expectedState);
  });
  it('should return filtered offers and initialOffers when action loadOffer', () => {
    const expectedState = {
      city: LocationCity.PARIS,
      offers: listMocksOffersPreviews.filter((offer) => offer.city.name === initialState.city),
      initialOffers: listMocksOffersPreviews,
      offersStatus: RequestStatus.NONE,
    };
    const result = offersSlice.reducer(initialState, offersAction.loadOffer(listMocksOffersPreviews));

    expect(result).toEqual(expectedState);
  });
  it('should return offer with a modified key isFavorite', () => {
    const filterOffers = listMocksOffersPreviews.filter((offer) => offer.city.name === initialState.city);
    const changeOffers = filterOffers.map((offer) => {
      if (offer.id === listMocksOffersPreviews[1].id) {
        offer.isFavorite = !listMocksOffersPreviews[1].isFavorite;
      }
    });
    // странная ошибка
    const expectedState = {
      city: LocationCity.PARIS,
      offers: changeOffers,
      initialOffers: listMocksOffersPreviews,
      offersStatus: RequestStatus.NONE,
    };
    const result = offersSlice.reducer(initialState, offersAction.addOfferToFavorites({ offerId: listMocksOffersPreviews[1].id, isFavorite: listMocksOffersPreviews[1].isFavorite }));

    expect(result).toEqual(expectedState);
  });
});
