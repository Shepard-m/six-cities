import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  it('should return footer component', () => {
    const footerTestId = 'footer';
    const footerComponent = withHistory(<Footer />);

    render(footerComponent);

    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
