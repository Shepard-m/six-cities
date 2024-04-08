type TRating = {
  ratingClass: string;
  isRatingValue?: boolean;
  rating: number;
}

export default function Rating({ ratingClass, isRatingValue, rating }: TRating) {
  return (
    <div className={`${ratingClass}__rating rating`} data-testid={'rating'}>
      <div className={`${ratingClass}__stars rating__stars`}>
        <span style={{ width: `${rating * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {isRatingValue &&
        <span className="offer__rating-value rating__value" data-testid={'rating-count'}>{rating}</span>}
    </div>


  );
}
