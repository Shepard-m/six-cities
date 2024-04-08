import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Header from './header';

describe('Header', () => {
  it('should return component: header', () => {
    const headerTestId = 'header';
    const headerComponent = withHistory(<Header navigation />);

    render(headerComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
