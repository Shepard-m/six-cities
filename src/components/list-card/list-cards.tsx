import { OptionCard } from '../../const';
import Card from '../card/card';
import { OfferPreviews } from '../../types/offer-preview';

type ListOfferNearbyProps = {
  offers: OfferPreviews[];
  onListItemHover: (currentCard: OfferPreviews | null) => void;
  extraClass: string;
}

export default function ListCards({ offers, onListItemHover, extraClass }: ListOfferNearbyProps) {

  const handelPointingCardMouseOver = (offer: OfferPreviews | null) => {
    onListItemHover(offer);
  };

  return (
    <div className={extraClass} data-testid={'list-component'}>
      {offers.map((offer) => <Card key={offer.id} optionCard={OptionCard.CITIES_CARD} offer={offer} handelPointCardMouseOver={handelPointingCardMouseOver} />)}
    </div>
  );
}
