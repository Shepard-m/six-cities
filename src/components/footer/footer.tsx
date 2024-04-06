import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Footer() {
  return (
    <footer className='footer container' data-testid={'footer'}>
      <Link className='footer__logo-link' to={AppRoute.Main}>
        <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
      </Link>
    </footer>
  );
}

export default memo(Footer);
