import Location from '../location/location';
import { memo } from 'react';
import { SyntheticEvent } from 'react';
import { listLocation } from '../../types/list-location';

type ListLocation = {
  listLocations: listLocation;
  handleCurrentCityClick: (evt: SyntheticEvent<HTMLSpanElement>) => void;
  currentCity: string;
}

function ListLocation({ listLocations, handleCurrentCityClick, currentCity }: ListLocation) {
  const listValuesLocations = Object.values(listLocations);
  return (
    <ul className="locations__list tabs__list" data-testid={'locations-list'}>
      {listValuesLocations.map((location) => <Location key={location} city={location} isActive={currentCity === location} handleCurrentCityClick={handleCurrentCityClick} />)}
    </ul>
  );
}

export default memo(ListLocation);
