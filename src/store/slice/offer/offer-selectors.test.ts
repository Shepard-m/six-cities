import { RequestStatus } from '../../../const';
import { mockOffer, mocksOfferPreviews } from '../../../utils/mocks';
import { offerSlice, offerSelector } from './offer';

describe('Offer selectors', () => {
  const emptyState = {
    [offerSlice.name]: {
      offerStatus: RequestStatus.NONE,
      nearby: [],
      currentOffer: null,
    }
  };
  const filledState = {
    [offerSlice.name]: {
      offerStatus: RequestStatus.NONE,
      nearby: [mocksOfferPreviews, mocksOfferPreviews],
      currentOffer: mockOffer,
    }
  };
  it('should return empty currentOffer', () => {
    const { currentOffer } = emptyState[offerSlice.name];

    const result = offerSelector.currentOffer(emptyState);

    expect(result).toBe(currentOffer);
  });
  it('should return currentOffer', () => {
    const { currentOffer } = filledState[offerSlice.name];

    const result = offerSelector.currentOffer(filledState);

    expect(result).toEqual(currentOffer);
  });
  it('should return empty nearby', () => {
    const { nearby } = emptyState[offerSlice.name];

    const result = offerSelector.nearby(emptyState);

    expect(result).toBe(nearby);
  });
  it('should return nearby', () => {
    const { nearby } = filledState[offerSlice.name];

    const result = offerSelector.nearby(filledState);

    expect(result).toBe(nearby);
  });
  it('should return offerStatus', () => {
    const { offerStatus } = emptyState[offerSlice.name];

    const result = offerSelector.offerStatus(emptyState);

    expect(result).toBe(offerStatus);
  });

});

