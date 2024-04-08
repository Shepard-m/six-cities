import PlacesOption from '../places-option/places-option';
import { ListSort } from '../../const';

type PlacesOptionsProps = {
  isOpen: boolean;
  handelSortOfferClick: (sortType: string) => void;
}

export default function PlacesOptions({ isOpen, handelSortOfferClick }: PlacesOptionsProps) {
  const listValuesSort = Object.values(ListSort);
  return (
    <ul className={`places__options places__options--custom ${isOpen && 'places__options--opened'}`} data-testid={'places-options'}>
      {listValuesSort.map((place) => <PlacesOption key={place} place={place} handelSortOfferClick={handelSortOfferClick} />)}
    </ul>
  );
}
