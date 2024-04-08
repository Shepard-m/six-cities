import Container from '../../components/container/container';
import ListCards from '../../components/list-card/list-cards';
import Map from '../../components/map/map';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import MainEmpty from '../../components/main-empty/main-empty';
import { OptionListCard, PagesClass, PagesMainClass, RequestStatus, mainEmptyClassContainer } from '../../const';
import { OfferPreviews } from '../../types/offer-preview';
import { LocationCity } from '../../const';
import ListLocation from '../../components/list-location/list-location';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PlacesOptions from '../../components/places-options/places-options';
import Loader from '../../components/loader/loader';
import { fetchOffersAction } from '../../store/api-action';
import { offersSelectors } from '../../store/slice/offers/offers';
import { offersAction } from '../../store/slice/offers/offers';

export default function MainPage() {
  const selectOffers = useAppSelector(offersSelectors.offers);
  const currentCity = useAppSelector(offersSelectors.city);
  const dispatch = useAppDispatch();
  const offersStatus = useAppSelector(offersSelectors.offersStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(offersAction.selectCity(currentCity));
  }, [currentCity, dispatch]);

  const [selectedOffer, setSelectedOffer] = useState<OfferPreviews | null>(
    null
  );

  const [isOpenSort, setIsOpenSort] = useState<boolean>(
    false
  );
  const [sortName, setSortName] = useState<string>(
    'popular'
  );

  const [selectedLocation, setSelectedLocation] = useState<string>(currentCity);

  const handelSortOfferClick = (sortType: string) => {
    dispatch(offersAction.sortOffer(sortType));
    setIsOpenSort(!isOpenSort);
    setSortName(sortType);
  };

  const handelOpenPlacesClick = () => {
    setIsOpenSort(!isOpenSort);
  };

  const handleListItemHover = (currentCard: OfferPreviews | null) => {
    setSelectedOffer(currentCard);
  };

  const handleCurrentCityClick = useCallback((evt: SyntheticEvent<HTMLSpanElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.tagName === 'SPAN' && evt.currentTarget.textContent !== null) {
      setSelectedLocation(evt.currentTarget.textContent);
      dispatch(offersAction.selectCity(evt.currentTarget.textContent));
    }

  }, [selectOffers]);

  if (offersStatus === RequestStatus.LOADING) {
    return <Loader />;
  }

  return (
    <Container pageClass={PagesClass.MAIN} mainClass={`${PagesMainClass.MAIN} ${selectOffers.length === 0 && PagesMainClass.MAIN_EMPTY}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs" data-testid={'main-page'}>
        <section className="locations container">
          <ListLocation listLocations={LocationCity} handleCurrentCityClick={handleCurrentCityClick} currentCity={selectedLocation} />
        </section>
      </div>
      <div className="cities" >
        <div className={`cities__places-container ${selectOffers.length === 0 && mainEmptyClassContainer} container`}>

          {selectOffers.length !== 0 ?
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{selectOffers.length} place{selectOffers.length > 1 ? 's' : ''} to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0} onClick={handelOpenPlacesClick}>
                  {sortName}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <PlacesOptions isOpen={isOpenSort} handelSortOfferClick={handelSortOfferClick} />
              </form>
              <ListCards offers={selectOffers} onListItemHover={handleListItemHover} extraClass={OptionListCard.CITIES_CARD} />
            </section> : <MainEmpty currentCity={currentCity} />}

          <div className="cities__right-section">
            {selectOffers.length &&
              <section className="cities__map map">
                <Map city={currentCity} offers={selectOffers} selectedOffer={selectedOffer} />
              </section>}
          </div>

        </div>
      </div>
    </Container>
  );
}

