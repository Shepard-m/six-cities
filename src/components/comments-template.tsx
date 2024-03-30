import { ChangeEvent, SyntheticEvent, useState } from 'react';
import Stars from './stars';
import { fetchCommentAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import { offerSelector } from '../store/slice/offer';

type CommentsTemplateProps = {
  offerId: string;
}

export default function CommentsTemplate({ offerId }: CommentsTemplateProps) {
  const isOfferDataLoadingStatus = useAppSelector(offerSelector.isOfferDataLoadingStatus);
  const [isCorrectnessForm, setIsCorrectnessForm] = useState(false);
  const [review, setReview] = useState({ comment: '', rating: 0 });
  const dispatch = useAppDispatch();

  const onChooseRating = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, rating: +target.defaultValue });
    setIsCorrectnessForm(false);


    if (review.comment.length >= 50 && review.comment.length < 300 && review.rating > 0) {
      setIsCorrectnessForm(true);
    }
  };

  const onInputCommentKeyDown = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, comment: target.value });

    setIsCorrectnessForm(false);

    if (review.comment.length >= 50 && review.comment.length < 300 && review.rating > 0) {
      setIsCorrectnessForm(true);
    }
  };

  const onSendReviewsSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsCorrectnessForm(false);
    try {
      dispatch(fetchCommentAction({ offerId, ...review }));
      setReview({ comment: '', rating: 0 });
      setIsCorrectnessForm(true);
    } catch { /* empty */ }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSendReviewsSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <Stars onChooseRating={onChooseRating} />
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} onInput={onInputCommentKeyDown} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isOfferDataLoadingStatus && !isCorrectnessForm}>Submit</button>
      </div>
    </form>
  );
}
