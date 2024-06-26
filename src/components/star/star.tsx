import { ChangeEvent } from 'react';
import { useAppSelector } from '../../hooks';
import { reviewsSelector } from '../../store/slice/reviews/reviews';
import { RequestStatus } from '../../const';

type StarProps = {
  countStar: number;
  onChooseRating: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  checkedStar: number;
}

export default function Star({ countStar, onChooseRating, checkedStar }: StarProps) {

  const reviewsStatus = useAppSelector(reviewsSelector.reviewsStatus);

  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" data-testid={'rating-input'} disabled={reviewsStatus === RequestStatus.LOADING} checked={countStar === checkedStar} value={countStar} onChange={onChooseRating} id={`${countStar}-stars`} type="radio" />
      <label htmlFor={`${countStar}-stars`} className="reviews__rating-label form__rating-label" data-testid={'rating-label'} title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}
