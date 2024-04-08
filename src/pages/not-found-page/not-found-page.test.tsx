import { withHistory } from '../../utils/mock-component';
import NotFoundPage from './not-found-page';
import { render, screen } from '@testing-library/react';

describe('NotFoundPage', () => {
  it('should return component NotFoundPage', () => {
    const notFoundPageComponent = withHistory(<NotFoundPage />);
    const notFoundPage = 'not-found-page';

    render(notFoundPageComponent);

    expect(screen.getByTestId(notFoundPage)).toBeInTheDocument();
  });
});
