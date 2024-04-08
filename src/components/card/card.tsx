import { Link } from 'react-router-dom';
import { OfferPreviews } from '../../types/offer-preview';
import Rating from '../rating/rating';
import { AppRoute } from '../../const';
import ButtonFavorite from '../button-favorite/button-favorite';
import { SizeOptionButtonFavorite } from '../../const';
import { memo } from 'react';

type TCardProps = {
  offer: OfferPreviews;
  optionCard: {
    classCard: string;
    width: string;
    height: string;
  };
  handelPointCardMouseOver: (currentOffer: OfferPreviews | null) => void;
}

function Card({ offer, optionCard, handelPointCardMouseOver }: TCardProps) {
  const { width, height, classCard } = optionCard;

  const onPointCardMouseOver = () => {
    handelPointCardMouseOver(offer);
  };

  const onPointCardMouseLeave = () => {
    handelPointCardMouseOver(null);
  };

  return (
    <article className={`${classCard} place-card`} onMouseOver={onPointCardMouseOver} onMouseLeave={onPointCardMouseLeave} data-testid={optionCard.classCard}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={`${offer.previewImage}`} width={width} height={height} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info" >
        <div className="place-card__price-wrapper" >
          <div className="place-card__price" >
            <b className="place-card__price-value" >&euro;{offer.price}</b>
            <span className="place-card__price-text" >&#47;&nbsp;night</span>
          </div>
          <ButtonFavorite offerId={offer.id} sizeOptionButtonFavorite={SizeOptionButtonFavorite.card} />
        </div>
        <Rating ratingClass="place-card" rating={offer.rating} />
        <h2 className="place-card__name" >
          <Link to={`/${AppRoute.Offer}/${offer.id}`} state={offer}>{offer.title}</Link>
        </h2>
        <p className="place-card__type" >{offer.type}</p>
      </div>
    </article>
  );
}

export default memo(Card);
