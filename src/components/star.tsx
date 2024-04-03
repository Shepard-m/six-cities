import { ChangeEvent, Fragment } from 'react';

type StarProps = {
  countStar: number;
  onChooseRating: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

export default function Star({ countStar, onChooseRating }: StarProps) {
  return (
    <Fragment key={countStar}>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={countStar} onChange={onChooseRating} id={`${countStar}-stars`} type="radio" />
      <label htmlFor={`${countStar}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </Fragment>
  );
}
