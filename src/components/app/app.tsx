import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritePage from '../../pages/favorite-page/favorite-page';
import LoginPage from '../../pages/login-page/login-page';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';

export default function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path={`/${AppRoute.Offer}/:offerId`}
          element={<OfferPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<ProtectedRoute><FavoritePage /></ProtectedRoute>}
        />
        <Route
          path={AppRoute.Login}
          element={<ProtectedRoute onlyUnAuth><LoginPage navigation={false} /></ProtectedRoute>}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}
