import Container from '../components/container';
import Card from '../components/card';
import FavoriteItems from '../components/favorite-items';
import { Helmet } from 'react-helmet-async';
import { OptionCard } from '../const';
import FavoritesEmpty from '../components/favorites-empty';
import { getFavoritesByLocation } from '../utils/utils';
import { useAppSelector } from '../hooks';
import { useAppDispatch } from '../hooks';
import { useEffect } from 'react';
import { fetchFavoriteAction } from '../store/api-action';
import { favoriteSelectors } from '../store/slice/favorite/favorite';
import Footer from '../components/footer';


export default function FavoritePage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);
  const dataFavorite = useAppSelector(favoriteSelectors.favorite);

  const favorites = getFavoritesByLocation(dataFavorite);
  return (
    <Container mainClass='favorites'>
      <Helmet>
        <title>Favorite</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {dataFavorite.length > 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favorites).map(([location, gropedFavorites]) => (
                  <FavoriteItems key={location} city={location}>
                    {gropedFavorites.map((favorite) => <Card key={favorite.id} optionCard={OptionCard.FAVORITES_CARD} offer={favorite} />)}
                  </FavoriteItems>
                )
                )}
              </ul>
            </section> : <FavoritesEmpty />}
        </div>
      </main>
      <Footer />
    </Container>
  );
}
