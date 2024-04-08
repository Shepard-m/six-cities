import { changeFavoriteAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { offerAction } from '../store/slice/offer/offer';
import { favoriteSelectors } from '../store/slice/favorite/favorite';
import { offersAction, offersSelectors } from '../store/slice/offers/offers';
import { favoriteAction } from '../store/slice/favorite/favorite';
import { userSelector } from '../store/slice/user/user';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../const';
import { useNavigate } from 'react-router-dom';
import { OfferPreviews } from '../types/offer-preview';

type TButtonFavorite = {
  offerId: string;
  sizeOptionButtonFavorite: {
    extraClass: string;
    width: string;
    height: string;
  };
}

export default function ButtonFavorite({ offerId, sizeOptionButtonFavorite }: TButtonFavorite) {
  const statusFavorite = useAppSelector(favoriteSelectors.statusFavorite);
  const authorizationStatus = useAppSelector(userSelector.authorizationStatus);
  const offers = useAppSelector(offersSelectors.offers);
  const favorite = offers.find((offer) => offer.id === offerId);
  let statusActive = favorite?.isFavorite;
  const { width, height, extraClass } = sizeOptionButtonFavorite;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus !== AuthorizationStatus.AUTH) {
    statusActive = false;
  }


  function onIsFavoriteClick() {
    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      navigate(AppRoute.Login);
    }
    statusActive = !favorite?.isFavorite;
    const status = +!favorite?.isFavorite;
    dispatch(changeFavoriteAction({ offerId, status }))
      .unwrap()
      .then(() => {
        Promise.all([
          dispatch(offerAction.addOfferNearbyToFavorites({ offerId, isFavorite: !favorite?.isFavorite })),
          dispatch(offersAction.addOfferToFavorites({ offerId, isFavorite: !favorite?.isFavorite })),
          dispatch(favoriteAction.addOfferToFavorites({ offer: favorite as OfferPreviews, isFavorite: !favorite?.isFavorite })),
        ]);
      })
      .catch(() => { });
  }

  return (
    <button className={`${extraClass}__bookmark-button button ${statusActive === true && `${extraClass}__bookmark-button--active`}`} data-testid={'button-favorite'} type="button" onClick={onIsFavoriteClick} disabled={statusFavorite === RequestStatus.LOADING}>
      <svg className={`${extraClass}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
