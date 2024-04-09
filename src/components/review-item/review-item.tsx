import { Comment } from '../../types/comment';
import Rating from '../rating/rating';
import { humanizeOrderData } from '../../utils/utils';

type CommentProp = {
  comment: Comment;
}

export default function ReviewItem({ comment }: CommentProp) {
  return (
    <li className="reviews__item" data-testid={'reviews-item'}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name" data-testid={'reviews-item-name'}>
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <Rating ratingClass="reviews" rating={comment.rating} />
        <p className="reviews__text" data-testid={'reviews-item-text'}>{comment.comment}</p>
        <time className="reviews__time" dateTime={comment.date}>{humanizeOrderData(comment.date, 'MMMM YYYY')}</time>
      </div>
    </li>
  );
}
