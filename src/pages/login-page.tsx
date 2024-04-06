import { Helmet } from 'react-helmet-async';
import { useRef, FormEvent } from 'react';
import { loginAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '../hooks';
import Container from '../components/container';
import { userSelector } from '../store/slice/user/user';
import { RequestStatus } from '../const';

type LoginPage = {
  navigation: boolean;
}

export default function LoginPage({ navigation }: LoginPage) {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const userStatus = useAppSelector(userSelector.userStatus);

  return (
    <Container mainClass='page__main--login' pageClass='page--gray page--login' navigation={navigation}>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            onClick={onFormSubmit}
            className="login__form form"
            action="#"
            method="post"
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email" name="email"
                placeholder="Email"
                disabled={userStatus === RequestStatus.LOADING}
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password" name="password"
                minLength={1}
                disabled={userStatus === RequestStatus.LOADING}
                placeholder="Password"
                required
              />
            </div>
            <button className="login__submit form__submit button" disabled={userStatus === RequestStatus.LOADING} type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </Container>
  );
}
