import { changeFavoriteAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { offerAction } from '../store/slice/offer';
import { offersAction, offersSelectors } from '../store/slice/offers';
import { favoriteAction } from '../store/slice/favorite';
import { userSelector } from '../store/slice/user';
import { AppRoute, AuthorizationStatus } from '../const';
import { useNavigate } from 'react-router-dom';
import { OfferPreviews } from '../types/offer-preview';

type TButtonFavorite = {
  offerId: string;
  isFavorite: boolean;
  sizeOptionButtonFavorite: {
    extraClass: string;
    width: string;
    height: string;
  };
}

export default function ButtonFavorite({ offerId, isFavorite, sizeOptionButtonFavorite }: TButtonFavorite) {
  const authorizationStatus = useAppSelector(userSelector.authorizationStatus);
  const offers = useAppSelector(offersSelectors.offers);
  const { width, height, extraClass } = sizeOptionButtonFavorite;
  const dispatch = useAppDispatch();
  let status = +isFavorite;
  const navigate = useNavigate();

  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    status = 0;
  }

  function onIsFavoriteClick() {
    const favorite = offers.find((offer) => offer.id === offerId);
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      status = 0;
      navigate(AppRoute.Login);
    }

    try {
      status = +!isFavorite;
      dispatch(changeFavoriteAction({ offerId, status }));
      dispatch(offerAction.addOfferNearbyToFavorites({ offerId, isFavorite: !isFavorite }));
      dispatch(offersAction.addOfferToFavorites({ offerId, isFavorite: !isFavorite }));
      dispatch(favoriteAction.addOfferToFavorites({ offer: favorite as OfferPreviews, isFavorite: !isFavorite }));

    } catch { /* empty */ }
  }

  return (
    <button className={`${extraClass}__bookmark-button button ${status === 1 && `${extraClass}__bookmark-button--active`}`} type="button" onClick={onIsFavoriteClick}>
      <svg className={`${extraClass}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
