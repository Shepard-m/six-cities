import { Helmet } from 'react-helmet-async';
import { FormEvent, useState, SyntheticEvent } from 'react';
import { loginAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Container from '../../components/container/container';
import { userSelector } from '../../store/slice/user/user';
import { AppRoute, LocationCity, PagesClass, PagesMainClass, RequestStatus, textError } from '../../const';
import { toast } from 'react-toastify';
import './login-page-style.css';
import { useNavigate } from 'react-router-dom';
import { getRandomLocation } from '../../utils/utils';
import { offersAction } from '../../store/slice/offers/offers';

type LoginPage = {
  navigation: boolean;
}

export default function LoginPage({ navigation }: LoginPage) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  const [userData, setUserData] = useState({ login: '', password: '' });
  const navigate = useNavigate();
  let correctForm = false;
  const listLocations = Object.values(LocationCity);
  const dispatch = useAppDispatch();

  if (!(re.test(userData.login))) {
    correctForm = false;
  } else {
    correctForm = true;
  }

  function onRedirectMainPageClick(evt: SyntheticEvent<HTMLSpanElement>) {
    dispatch(offersAction.selectCity(evt.currentTarget.textContent as string));
    navigate(AppRoute.Main);
  }

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (correctForm === false) {
      toast.error(textError.textErrorCorrectValidationForm);
    } else {
      correctForm = true;
    }

    if (correctForm) {
      dispatch(loginAction({
        login: userData.login,
        password: userData.password
      }))
        .unwrap()
        .then(() => {
          toast.warn(textError.textSuccessAuthorization);
          setUserData({ login: '', password: '' });
          navigate(AppRoute.Main);
        })
        .catch(() => {
          toast.warn(textError.textFailedAuthorization);
        });
    }
  };

  function onInputPasswordKeyDown(evt: SyntheticEvent<HTMLInputElement>) {
    setUserData({ ...userData, password: evt.currentTarget.value });

  }
  function onInputEmailKeyDown(evt: SyntheticEvent<HTMLInputElement>) {
    setUserData({ ...userData, login: evt.currentTarget.value });
  }

  const userStatus = useAppSelector(userSelector.userStatus);

  return (
    <Container mainClass={PagesMainClass.LOGIN} pageClass={PagesClass.LOGIN} navigation={navigation}>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="page__login-container container" data-testid={'login-page'}>
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            onSubmit={onFormSubmit}
            className="login__form form"
            action="#"
            method="post"
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className='login__input form__input'
                type="email" name="email"
                placeholder="Email"
                disabled={userStatus === RequestStatus.LOADING}
                required
                onInput={onInputEmailKeyDown}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password" name="password"
                minLength={2}
                disabled={userStatus === RequestStatus.LOADING}
                placeholder="Password"
                required
                onInput={onInputPasswordKeyDown}
              />
            </div>
            <button className="login__submit form__submit button" disabled={userStatus === RequestStatus.LOADING} type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span onClick={onRedirectMainPageClick}>{getRandomLocation(listLocations)}</span>
            </a>
          </div>
        </section>
      </div>
    </Container>
  );
}
