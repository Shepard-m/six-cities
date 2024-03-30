import { ChangeEvent, Fragment } from 'react';
import { countStars } from '../const';
import { memo } from 'react';

type StarProps = {
  onChooseRating: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

function Stars({ onChooseRating }: StarProps) {
  return (
    <Fragment>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={countStars.five} onChange={onChooseRating} id={`${countStars.five}-stars`} type="radio" />
      <label htmlFor={`${countStars.five}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={countStars.foo} onChange={onChooseRating} id={`${countStars.foo}-stars`} type="radio" />
      <label htmlFor={`${countStars.foo}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={countStars.three} onChange={onChooseRating} id={`${countStars.three}-stars`} type="radio" />
      <label htmlFor={`${countStars.three}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={countStars.two} onChange={onChooseRating} id={`${countStars.two}-stars`} type="radio" />
      <label htmlFor={`${countStars.two}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
      <input className="form__rating-input visually-hidden" name="rating" defaultValue={countStars.one} onChange={onChooseRating} id={`${countStars.one}-stars`} type="radio" />
      <label htmlFor={`${countStars.one}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </Fragment>
  );
}

export default memo(Stars);
