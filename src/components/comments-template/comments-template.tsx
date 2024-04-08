import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import Stars from '../stars/stars';
import { fetchCommentAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reviewsSelector } from '../../store/slice/reviews/reviews';
import { RequestStatus, textError } from '../../const';
import { toast } from 'react-toastify';
import { validationsFormMessage } from '../../utils/utils';

type CommentsTemplateProps = {
  offerId: string;
}

export default function CommentsTemplate({ offerId }: CommentsTemplateProps) {
  const reviewsStatus = useAppSelector(reviewsSelector.reviewsStatus);
  const [isDisabledButton, setIsDisabledForm] = useState(true);
  const [review, setReview] = useState({ comment: '', rating: 0 });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setReview({ comment: '', rating: 0 });
  }, [offerId]);

  useEffect(() => {
    setIsDisabledForm(!validationsFormMessage(review));
  }, [review]);

  const onChooseRating = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, rating: +target.defaultValue });

    setIsDisabledForm(false);
  };

  const onInputCommentKeyDown = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, comment: target.value });

    setIsDisabledForm(false);
  };

  const onSendReviewsSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsDisabledForm(true);
    dispatch(fetchCommentAction({ offerId, ...review }))
      .unwrap()
      .then(() => {
        setReview({ comment: '', rating: 0 });
        setIsDisabledForm(true);
      })
      .catch(() => {
        setIsDisabledForm(false);
        toast.error(textError.textFailedSendComment);
      });
  };


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSendReviewsSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <Stars onChooseRating={onChooseRating} rating={review.rating} />
      <textarea className="reviews__textarea form__textarea" data-testid={'reviews-text'} disabled={reviewsStatus === RequestStatus.LOADING} minLength={50} maxLength={300} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={review.comment} onInput={onInputCommentKeyDown} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button data-testid={'reviews-button'} className="reviews__submit form__submit button" type="submit" disabled={isDisabledButton}>Submit</button>
      </div>
    </form>
  );
}
