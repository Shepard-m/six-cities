import { Location, Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppSelector } from '../hooks';
import { userSelector } from '../store/slice/user/user';

type TProtectedRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

type FromState = {
  from?: Location;
}

export default function ProtectedRoute({ children, onlyUnAuth }: TProtectedRouteProps): JSX.Element {
  const user = useAppSelector(userSelector.dataUser);
  const location: Location<FromState> = useLocation() as Location<FromState>;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: AppRoute.Main };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate state={{ from: location }} to={AppRoute.Login} />;
  }

  return children;
}

