import { SyntheticEvent } from 'react';

type LocationProps = {
  city: string;
  isActive: boolean;
  handleCurrentCityClick: (evt: SyntheticEvent<HTMLSpanElement>) => void;
}

export default function Location({ city, isActive, handleCurrentCityClick }: LocationProps) {
  return (
    <li className='locations__item' data-testid={'location'}>
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#" data-testid={'location-link'}>
        <span onClick={handleCurrentCityClick}>{city}</span>
      </a>
    </li>
  );
}

