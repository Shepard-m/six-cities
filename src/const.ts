enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = 'offer',
}

const OptionCard = {
  CITIES_CARD: {
    classCard: 'cities__card',
    width: '260',
    height: '200',
    additionalOptions: {
      imageWrapper: ' ',
      infoWrapper: ' ',
    }
  },
  FAVORITES_CARD: {
    classCard: 'favorites__card',
    width: '150',
    height: '110',
    additionalOptions: {
      imageWrapper: 'favorites__image-wrapper ',
      infoWrapper: 'favorites__card-info ',
    }
  }
};

const MapSize = {
  WIDTH: '100%',
  HEIGHT: '100%',
};


const OptionListCard = {
  FAVORITES_CARD: 'near-places__list places__list',
  CITIES_CARD: 'cities__places-list places__list tabs__content',
};

const ListSort = {
  SORT_POPULAR: 'Popular',
  SORT_PRICE_LOW: 'Price: low to high',
  SORT_PRICE_HIGH: 'Price: high to low',
  SORT_RATED: 'Top rated first',
};

const ListLocation = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

const APIRoute = {
  OFFERS: '/offers',
  FAVORITE: '/favorite',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: 'logout',
};

const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UN_KNOWN: 'UNKNOWN',
};

const RequestStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed',
  NONE: 'none'
};

const SizeOptionButtonFavorite = {
  card: {
    extraClass: 'place-card',
    width: '18',
    height: '19',
  },
  offer: {
    extraClass: 'offer',
    width: '31',
    height: '33',
  }
};

const PagesMainClass = {
  FAVORITES: 'page__main--favorites',
  FAVORITES_EMPTY: 'page__main--favorites-empty',
  MAIN: 'page__main--index',
  MAIN_EMPTY: 'page__main--index-empty',
  OFFER: 'page__main--offer',
  LOGIN: 'page__main--login',
};

const PagesClass = {
  FAVORITES_EMPTY: 'page--favorites-empty',
  MAIN: 'page--gray page--main',
  LOGIN: 'page--gray page--login',
};

const countStars = {
  one: 1,
  two: 2,
  three: 3,
  foo: 4,
  five: 5
};

const OptionValidationFormReviews = {
  MAX_LENGTH: 300,
  MIN_LENGTH: 50,
  RATING: 0,
};

const textError = {
  textErrorAddOfferInFavorite: 'an error occurred when adding a suggestion to favorites',
  textErrorCorrectValidationForm: 'an error occurred when adding a suggestion to favorites',
  textLackOfAuthorization: 'the user is not logged in',
  textSuccessAuthorization: 'you have successfully logged in',
  textFailedAuthorization: 'an error occurred during authorization',
  textFailedSendComment: 'an error occurred when sending a comment',
};

const mainEmptyClassContainer = 'cities__places-container--empty';


const URL_MARKER_DEFAULT = 'img/pin.svg';

const URL_MARKER_CURRENT = 'img/pin-active.svg';

export { OptionValidationFormReviews, textError, mainEmptyClassContainer, PagesClass, PagesMainClass, AppRoute, countStars, SizeOptionButtonFavorite, RequestStatus, AuthorizationStatus, OptionCard, URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OptionListCard, MapSize, ListSort, ListLocation as LocationCity, APIRoute };
