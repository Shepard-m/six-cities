import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import './not-found-page-model.css';

export default function NotFoundPage() {
  return (
    <div className='not-found-page-model' data-testid={'not-found-page'}>
      <Helmet>
        <title>Not found page</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>
        <p>На глваную страницу</p>
      </Link>
    </div>
  );
}
