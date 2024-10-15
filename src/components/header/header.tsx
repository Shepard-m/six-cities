import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { checkAuthAction, fetchFavoriteAction } from '../../store/api-action';
import { logoutAction } from '../../store/api-action';
import { AuthorizationStatus } from '../../const';
import { userSelector } from '../../store/slice/user/user';
import { favoriteSelectors } from '../../store/slice/favorite/favorite';
import { dropToken, getToken } from '../../service/token';
import { toast } from 'react-toastify';
import { textError } from '../../const';

type THeaderProps = {
  navigation: boolean;
}

function Header({ navigation }: THeaderProps) {
  const dispatch = useAppDispatch();
  const token = getToken();
  const favorite = useAppSelector(favoriteSelectors.favorite);
  useEffect(() => {
    if (token !== '') {
      dispatch(checkAuthAction());
      dispatch(fetchFavoriteAction());
    } else {
      toast.warn(textError.textLackOfAuthorization);
    }
  }, []);

  const authorizationStatus = useAppSelector(userSelector.authorizationStatus);
  const user = useAppSelector(userSelector.dataUser);

  const logoutAccount = () => {
    dispatch(logoutAction())
      .unwrap()
      .then(() => {
        dropToken();
      })
      .catch();

  };

  return (
    <header className="header" data-testid={'header'}>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {navigation ?
            (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      {authorizationStatus === AuthorizationStatus.AUTH && (
                        <>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{user?.email}</span>
                          <span className="header__favorite-count">{favorite.length}</span>
                        </>
                      )}
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    {authorizationStatus === AuthorizationStatus.AUTH ?
                      <Link to={AppRoute.Main} className="header__nav-link" onClick={logoutAccount}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                      :
                      <Link to={AppRoute.Login} className="header__nav-link">
                        <span className="header__signout">Sign in</span>
                      </Link>}
                  </li>
                </ul>
              </nav>
            ) : ''}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
