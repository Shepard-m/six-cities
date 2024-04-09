import { render, screen, waitFor } from '@testing-library/react';
import MainPage from './main-page';
import { withHistory } from '../../utils/mock-component';

describe('MainPage', () => {
  it('should return component mainPage', async () => {
    const mainPageTetsId = 'main-page';
    const componentMainPage = withHistory(<MainPage />);
    render(componentMainPage);

    await waitFor(() => expect(screen.getByTestId(mainPageTetsId)).toBeInTheDocument());
  });
});
