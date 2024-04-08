import Container from '../../components/container/container';
import Card from '../../components/card/card';
import FavoriteItems from '../../components/favorite-items/favorite-items';
import { Helmet } from 'react-helmet-async';
import { OptionCard, PagesClass, PagesMainClass } from '../../const';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { getFavoritesByLocation } from '../../utils/utils';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoriteAction } from '../../store/api-action';
import { favoriteSelectors } from '../../store/slice/favorite/favorite';


export default function FavoritePage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);
  const dataFavorite = useAppSelector(favoriteSelectors.favorite);

  const favorites = getFavoritesByLocation(dataFavorite);
  return (
    <Container mainClass={`${PagesMainClass.FAVORITES} ${dataFavorite.length === 0 ? PagesMainClass.FAVORITES_EMPTY : ''}`} pageClass={`${dataFavorite.length === 0 ? PagesClass.FAVORITES_EMPTY : ''}`} isFooter>
      <Helmet>
        <title>Favorite</title>
      </Helmet>
      <div className="page__favorites-container container" data-testid={'favorite-page'}>
        {dataFavorite.length > 0 ?
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favorites).map(([location, gropedFavorites]) => (
                <FavoriteItems key={location} city={location}>
                  {gropedFavorites.map((favorite) => <Card key={favorite.id} optionCard={OptionCard.FAVORITES_CARD} offer={favorite} handelPointCardMouseOver={() => { }} />)}
                </FavoriteItems>
              )
              )}
            </ul>
          </section> : <FavoritesEmpty />}
      </div>
    </Container>
  );
}
