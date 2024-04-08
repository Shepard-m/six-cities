import Container from '../../components/container/container';
import OfferInside from '../../components/offer-inside/offer-inside';
import Rating from '../../components/rating/rating';
import { Helmet } from 'react-helmet-async';
import CommentsTemplate from '../../components/comments-template/comments-template';
import { PagesMainClass, RequestStatus, SizeOptionButtonFavorite } from '../../const';
import ReviewsComments from '../../components/reviews-comments/reviews-comments';
import Map from '../../components/map/map';
import { useEffect, useState } from 'react';
import { OptionListCard } from '../../const';
import ListCards from '../../components/list-card/list-cards';
import { OfferPreviews } from '../../types/offer-preview';
import { useAppSelector } from '../../hooks';
import { fetchCommentsAction, fetchOfferAction, fetchOfferNearbyAction, fetchOffersAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { offerSelector } from '../../store/slice/offer/offer';
import { offersSelectors } from '../../store/slice/offers/offers';
import { reviewsSelector } from '../../store/slice/reviews/reviews';
import { userSelector } from '../../store/slice/user/user';
import ButtonFavorite from '../../components/button-favorite/button-favorite';
import { sortCommentsByDate } from '../../utils/utils';

export default function OfferPage() {
  const dispatch = useAppDispatch();
  const { offerId } = useParams();

  const offer = useAppSelector(offerSelector.currentOffer);
  const comments = useAppSelector(reviewsSelector.comments);
  const nearby = useAppSelector(offerSelector.nearby);
  const user = useAppSelector(userSelector.dataUser);
  const offersStatus = useAppSelector(offersSelectors.offersStatus);
  useEffect(() => {
    Promise.all([
      dispatch(fetchOffersAction()),
      dispatch(fetchCommentsAction(offerId as string)),
      dispatch(fetchOfferAction(offerId as string)),
      dispatch(fetchOfferNearbyAction(offerId as string))
    ]);
  }, [dispatch, offerId]);


  const sortComments = sortCommentsByDate(comments);
  const [selectedOffer, setSelectedOffer] = useState<OfferPreviews | null>(
    null
  );
  const handleListItemHover = (currentCard: OfferPreviews | null) => {
    if (currentCard !== null) {
      setSelectedOffer(currentCard);
    }
  };

  if (offer === null) {
    return;
  }

  if (offersStatus === RequestStatus.LOADING) {
    return <Loader />;
  }

  return (
    <Container mainClass={PagesMainClass.OFFER}>
      <Helmet>
        <title>Offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.map((image: string) => (
              <div key={image} className="offer__image-wrapper">
                <img className="offer__image" src={`${image}`} alt="Photo studio" />
              </div>
            )
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}

            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <ButtonFavorite offerId={offer.id} sizeOptionButtonFavorite={SizeOptionButtonFavorite.offer} />
            </div>
            <Rating ratingClass='offer' rating={offer.rating} isRatingValue />
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type && offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms && `${offer.bedrooms} Bedrooms`}
              </li>
              <li className="offer__feature offer__feature--adults">
                {offer.maxAdults && `Max ${offer.maxAdults} adults`}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods.map((good) => <OfferInside key={good} textOffer={good} />)}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro &&
                  <span className="offer__user-status">
                    Pro
                  </span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortComments.length}</span></h2>
              <ReviewsComments comments={sortComments} />
              {user !== null && <CommentsTemplate offerId={offerId as string} />}
            </section>
          </div>
        </div>
        <section className="offer__map map">
          <Map city={offer.city} offers={nearby} selectedOffer={selectedOffer} />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <ListCards offers={nearby} onListItemHover={handleListItemHover} extraClass={OptionListCard.FAVORITES_CARD} />
        </section>
      </div>
    </Container>
  );
}

