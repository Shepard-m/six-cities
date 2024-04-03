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
    height: '200'
  },
  FAVORITES_CARD: {
    classCard: 'favorites__card',
    width: '150',
    height: '110'
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
  SORT_PRICE_HIGH: 'Price: low to high',
  SORT_PRICE_LOW: 'Price: high to low',
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

const countStars = {
  one: 1,
  two: 2,
  three: 3,
  foo: 4,
  five: 5
};


const URL_MARKER_DEFAULT = '../markup/img/pin.svg';

const URL_MARKER_CURRENT = '../markup/img/pin-active.svg';


const CountStar: number = 5;

export { CountStar, AppRoute, countStars, SizeOptionButtonFavorite, RequestStatus, AuthorizationStatus, OptionCard, URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OptionListCard, MapSize, ListSort, ListLocation as LocationCity, APIRoute };
