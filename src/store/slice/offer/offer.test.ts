import { RequestStatus } from '../../../const';
import { offerSlice } from './offer';
import { fetchOfferAction, fetchOfferNearbyAction } from '../../api-action';
import { mockOffer } from '../../../utils/mocks';

describe('Offer Slice', () => {
  const emptyState = {
    offerStatus: RequestStatus.NONE,
    nearby: [],
    currentOffer: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = offerSlice.reducer(emptyState, emptyAction);

    expect(result).toEqual(emptyState);
  });

  it('should return offerStatus = loading when fetchOfferAction.pending', () => {
    const expectedState = {
      offerStatus: RequestStatus.LOADING,
      nearby: [],
      currentOffer: null,
    };

    const result = offerSlice.reducer(emptyState, fetchOfferAction.pending('', ''));

    expect(result).toEqual(expectedState);
  });
  it('should return offerStatus = success and currentOffer when fetchOfferAction.fulfilled', () => {
    const expectedState = {
      offerStatus: RequestStatus.SUCCESS,
      nearby: [],
      currentOffer: mockOffer,
    };

    const result = offerSlice.reducer(emptyState, fetchOfferAction.fulfilled(mockOffer, '', ''));

    expect(result).toEqual(expectedState);
  });
  it('should return offerStatus = FAILED when fetchOfferAction.rejected', () => {
    const expectedState = {
      offerStatus: RequestStatus.FAILED,
      nearby: [],
      currentOffer: null,
    };

    const result = offerSlice.reducer(emptyState, fetchOfferAction.rejected(null, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should return offerStatus = SUCCESS and array nearby when fetchOfferNearbyAction.fulfilled', () => {
    const expectedState = {
      offerStatus: RequestStatus.SUCCESS,
      nearby: [mockOffer, mockOffer],
      currentOffer: null,
    };

    const result = offerSlice.reducer(emptyState, fetchOfferNearbyAction.fulfilled([mockOffer, mockOffer], '', ''));

    expect(result).toEqual(expectedState);
  });


});
