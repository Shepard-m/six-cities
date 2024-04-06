import { SyntheticEvent } from 'react';

type PlacesOptionProps = {
  place: string;
  handelSortOfferClick: (sortType: string) => void;
}

export default function PlacesOption({ place, handelSortOfferClick }: PlacesOptionProps) {
  const onSortOfferClick = (evt: SyntheticEvent<HTMLLIElement>) => {
    if (evt.currentTarget.textContent !== null) {
      handelSortOfferClick(evt.currentTarget.textContent);
    }
  };
  return (
    <li className="places__option" tabIndex={0} onClick={onSortOfferClick} data-testid={'places-option'}>{place}</li>
  );
}
