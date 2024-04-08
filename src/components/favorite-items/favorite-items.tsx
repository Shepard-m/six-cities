import { ReactNode } from 'react';

type TFavoriteItemsProps = {
  children: ReactNode;
  city: string;
}
export default function FavoriteItems({ children, city }: TFavoriteItemsProps) {
  return (
    <li className="favorites__locations-items" data-testid={'favorite-items'}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {children}
      </div>
    </li>
  );
}
