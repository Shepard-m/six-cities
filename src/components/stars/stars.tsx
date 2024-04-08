import { ChangeEvent } from 'react';
import { countStars } from '../../const';
import { memo } from 'react';
import Star from '../star/star';

type StarProps = {
  onChooseRating: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  rating: number;
}

function Stars({ onChooseRating, rating }: StarProps) {

  const countStarsValue = Object.values(countStars);

  return (
    <div className="reviews__rating-form form__rating" data-testid={'stars'}>
      {countStarsValue.map((count) => <Star key={count} countStar={count} checkedStar={rating} onChooseRating={onChooseRating} />)}
    </div>
  );
}

export default memo(Stars);
