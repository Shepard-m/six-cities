const mocksOfferPreviews = {
  id: 'ea168f47-f416-422d-9daf-e4116c7e81e7',
  title: 'The house among olive ',
  type: 'apartment',
  price: 142,
  previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  isFavorite: false,
  isPremium: false,
  rating: 3.1
};
const listMocksOffersPreviews = [
  {
    id: '1a168f47-f416-422d-9daf-e4116c7e81e7',
    title: 'The house among olive ',
    type: 'apartment',
    price: 142,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.1
  },
  {
    id: '2a168f47-f416-422d-9daf-e4116c7e81e7',
    title: 'The house among olive ',
    type: 'apartment',
    price: 142,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.1
  },
  {
    id: '3a168f47-f416-422d-9daf-e4116c7e81e7',
    title: 'The house among olive ',
    type: 'apartment',
    price: 142,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.1
  },
];

const mockOffer = {
  id: 'ea168f47-f416-422d-9daf-e4116c7e81e7',
  title: 'The house among olive ',
  description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  type: 'apartment',
  price: 142,
  images: [
    'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/9.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/3.jpg'
  ],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  location: {
    latitude: 48.868610000000004,
    longitude: 2.342499,
    zoom: 16
  },
  goods: [
    'Towels',
    'Baby seat',
    'Washer',
    'Fridge',
    'Laptop friendly workspace',
    'Air conditioning',
    'Coffee machine'
  ],
  host: {
    isPro: true,
    name: 'Angelina',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  isPremium: false,
  isFavorite: false,
  rating: 3.1,
  bedrooms: 4,
  maxAdults: 4
};

const mockFetchCommentUser = {
  offerId: 'offerId',
  comment: 'test',
  rating: 5,
};

const mockComment = {
  id: 'offerId',
  date: '2024-03-11T21:00:00.018Z',
  user: {
    name: 'Isaac',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/3.jpg',
    isPro: false,
  },
  comment: 'test',
  rating: 5,
};

const mockUser = {
  login: 'test@.yandex.ru',
  password: 'test111',
};

const mockUserData = {
  name: 'Test',
  avatarUrl: 'test.png',
  isPro: true,
  email: 'test@yandex.ru',
  token: 'test123'
};

export { mocksOfferPreviews, mockUserData, mockUser, mockComment, mockFetchCommentUser, mockOffer, listMocksOffersPreviews };
