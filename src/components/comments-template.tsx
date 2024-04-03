import { ChangeEvent, SyntheticEvent, useState } from 'react';
import Stars from './stars';
import { fetchCommentAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reviewsSelector } from '../store/slice/reviews/reviews';
import { RequestStatus } from '../const';

type CommentsTemplateProps = {
  offerId: string;
}

export default function CommentsTemplate({ offerId }: CommentsTemplateProps) {
  const reviewsStatus = useAppSelector(reviewsSelector.reviewsStatus);
  const [isCorrectnessForm, setIsCorrectnessForm] = useState(false);
  const [review, setReview] = useState({ comment: '', rating: 0 });
  const dispatch = useAppDispatch();

  const onChooseRating = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, rating: +target.defaultValue });

    const rating = +target.defaultValue;

    setIsCorrectnessForm(false);

    if (review.comment.length >= 50 && review.comment.length <= 300 && rating > 0) {
      setIsCorrectnessForm(true);
    }
  };

  const onInputCommentKeyDown = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, comment: target.value });

    const comments = target.value;

    setIsCorrectnessForm(false);

    if (comments.length >= 50 && comments.length <= 300 && review.rating > 0) {
      setIsCorrectnessForm(true);
    }
  };

  const onSendReviewsSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsCorrectnessForm(false);
    dispatch(fetchCommentAction({ offerId, ...review }))
      .unwrap()
      .then(() => {
        setReview({ comment: '', rating: 0 });
        setIsCorrectnessForm(true);
        evt.currentTarget.reset();
      })
      .catch(() => {
        setIsCorrectnessForm(true);
      });
  };


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSendReviewsSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <Stars onChooseRating={onChooseRating} />
      </div>
      <textarea className="reviews__textarea form__textarea" minLength={50} maxLength={300} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} onInput={onInputCommentKeyDown} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!(reviewsStatus === RequestStatus.LOADING) && !isCorrectnessForm}>Submit</button>
      </div>
    </form>
  );
}
