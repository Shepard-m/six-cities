import Loader from './loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
  it('should return component: loader', () => {
    const loaderTestId = 'loader';

    render(<Loader />);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });
});
