import { OptionValidationFormReviews } from '../const';
import { Comment } from '../types/comment';
import { OfferPreviews } from '../types/offer-preview';
import dayjs from 'dayjs';

function getFavoritesByLocation(favorites: OfferPreviews[]) {
  return favorites.reduce<{ [key: string]: OfferPreviews[] }>((acc, current) => {
    const location = current.city.name;
    if (!(location in acc)) {
      acc[location] = [];
    }
    if (current.isFavorite) {
      acc[location].push(current);
    }

    return acc;
  }, {});
}

function humanizeOrderData(date: string, format: string) {
  return date ? dayjs(date).format(format) : '';
}

function sortPriceLow(offerA: OfferPreviews, offerB: OfferPreviews,) {
  return offerA.price - offerB.price;
}

function sortPriceHigh(offerA: OfferPreviews, offerB: OfferPreviews,) {
  return offerB.price - offerA.price;
}

function sortRating(offerA: OfferPreviews, offerB: OfferPreviews,) {
  return offerB.rating - offerA.rating;
}

function sortCommentsByDate(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
}

function getRandomLocation(locations: string[]): string {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}

const validationsFormMessage = ({ rating, comment }: { rating: number; comment: string }) =>
  comment.length <= OptionValidationFormReviews.MAX_LENGTH &&
  comment.length >= OptionValidationFormReviews.MIN_LENGTH &&
  rating > OptionValidationFormReviews.RATING;


export { sortCommentsByDate, getRandomLocation, validationsFormMessage, getFavoritesByLocation, humanizeOrderData, sortPriceLow, sortPriceHigh, sortRating };
