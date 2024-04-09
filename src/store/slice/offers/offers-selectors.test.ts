import { LocationCity, RequestStatus } from '../../../const';
import { offersSelectors, offersSlice } from './offers';

describe('Offers Selectors', () => {
  const initialState = {
    [offersSlice.name]: {
      city: LocationCity.PARIS,
      offers: [],
      initialOffers: [],
      offersStatus: RequestStatus.NONE,
    }
  };
  it('should return isOffersDataLoading', () => {
    const { offersStatus } = initialState[offersSlice.name];

    const result = offersSelectors.offersStatus(initialState);

    expect(result).toBe(offersStatus);
  });
  it('should return offers', () => {
    const { offers } = initialState[offersSlice.name];

    const result = offersSelectors.offers(initialState);

    expect(result).toBe(offers);
  });
  it('should return initialOffers', () => {
    const { initialOffers } = initialState[offersSlice.name];

    const result = offersSelectors.initialOffers(initialState);

    expect(result).toBe(initialOffers);
  });
  it('should return status', () => {
    const { offersStatus } = initialState[offersSlice.name];

    const result = offersSelectors.offersStatus(initialState);

    expect(result).toBe(offersStatus);
  });
  it('should return city', () => {
    const { city } = initialState[offersSlice.name];

    const result = offersSelectors.city(initialState);

    expect(result).toBe(city);
  });
});
