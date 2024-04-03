import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { OfferPreviews } from '../types/offer-preview';
import { APIRoute, AppRoute } from '../const';
import { Comment } from '../types/comment';
import { TApiComment } from '../types/api-comment';
import { userAction } from './slice/user';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { saveToken } from '../service/token';
import { TUser } from '../types/user';
import { ChangeFavorite } from '../types/change-favorites';

export const fetchOffersAction = createAsyncThunk<OfferPreviews[], undefined, { extra: AxiosInstance }>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreviews[]>(APIRoute.OFFERS);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], string, { extra: AxiosInstance }>(
  'data/loadComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.COMMENTS}/${id}`);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'data/chooseOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.OFFERS}/${id}`);
    return data;
  },
);

export const fetchOfferNearbyAction = createAsyncThunk<OfferPreviews[], string, { extra: AxiosInstance }>(
  'data/chooseOfferNearby',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferPreviews[]>(`${APIRoute.OFFERS}/${id}/nearby`);
    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthData, { extra: AxiosInstance }>(
  'data/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.LOGIN, { email, password });
    saveToken(token);
    dispatch(userAction.redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'data/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.LOGOUT);
  },
);

export const checkAuthAction = createAsyncThunk<TUser, undefined, { extra: AxiosInstance }>(
  'data/fetchUser',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TUser>(APIRoute.LOGIN);
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<OfferPreviews[], undefined, { extra: AxiosInstance }>(
  'data/fetchFavorite',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreviews[]>(APIRoute.FAVORITE);
    return data;
  },
);

export const changeFavoriteAction = createAsyncThunk<OfferPreviews, ChangeFavorite, { extra: AxiosInstance }>(
  'data/changeFavorite',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<OfferPreviews>(`${APIRoute.FAVORITE}/${offerId}/${status}`);

    return { data };
  }
);

export const fetchCommentAction = createAsyncThunk<Comment, TApiComment, { extra: AxiosInstance }>(
  'data/fetchComment',
  async ({ offerId, rating, comment }, { extra: api }) => {
    const { data } = await api.post<OfferPreviews[]>(`${APIRoute.COMMENTS}/${offerId}`, { rating, comment });
    return { ...data };
  }
);
