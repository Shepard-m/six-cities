import { changeFavoriteAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { offerAction } from '../store/slice/offer';
import { favoriteSelectors } from '../store/slice/favorite';
import { offersAction, offersSelectors } from '../store/slice/offers';
import { favoriteAction } from '../store/slice/favorite';
import { userSelector } from '../store/slice/user';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../const';
import { useNavigate } from 'react-router-dom';
import { OfferPreviews } from '../types/offer-preview';
import { useState } from 'react';

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
  const statusFavorite = useAppSelector(favoriteSelectors.statusFavorite);
  const authorizationStatus = useAppSelector(userSelector.authorizationStatus);
  const offers = useAppSelector(offersSelectors.offers);
  const [buttonActive, setButtonActive] = useState(+isFavorite);
  let status = +isFavorite;
  const { width, height, extraClass } = sizeOptionButtonFavorite;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    status = 0;
  }

  function onIsFavoriteClick() {
    const favorite = offers.find((offer) => offer.id === offerId);
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      setButtonActive(0);
      navigate(AppRoute.Login);
    }

    setButtonActive(+!isFavorite);
    status = (+!isFavorite);

    dispatch(changeFavoriteAction({ offerId, status }));
    dispatch(offerAction.addOfferNearbyToFavorites({ offerId, isFavorite: !isFavorite }));
    dispatch(offersAction.addOfferToFavorites({ offerId, isFavorite: !isFavorite }));
    dispatch(favoriteAction.addOfferToFavorites({ offer: favorite as OfferPreviews, isFavorite: !isFavorite }));


  }

  return (
    <button className={`${extraClass}__bookmark-button button ${status === 1 && `${extraClass}__bookmark-button--active`}`} type="button" onClick={onIsFavoriteClick} disabled={statusFavorite === RequestStatus.LOADING}>
      <svg className={`${extraClass}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
