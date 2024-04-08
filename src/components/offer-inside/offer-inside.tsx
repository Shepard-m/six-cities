type TOfferInside = {
  textOffer: string;
}

export default function OfferInside({ textOffer }: TOfferInside) {
  return (
    <li className="offer__inside-item" data-testid={'offer-inside'}>
      {textOffer}
    </li>
  );
}
