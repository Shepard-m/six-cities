import { PagesClass, PagesMainClass } from '../../const';
import Container from './container';
import { withHistory } from '../../utils/mock-component';
import { render, screen, waitFor } from '@testing-library/react';
import clsx from 'clsx';

describe('Container', () => {
  it('should return component Container and correct class', async () => {
    const mainContainerTetsId = 'container';
    const mainContainerPageClassTetsId = 'pageClass';
    const testChildren = <span>test</span>;
    const componentMainPage = withHistory(<Container mainClass={PagesMainClass.MAIN} pageClass={PagesClass.MAIN}>{testChildren}</Container>);
    render(componentMainPage);

    await waitFor(() => expect(screen.getByTestId(mainContainerTetsId)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId(mainContainerPageClassTetsId)).toHaveClass(clsx('page', PagesClass.MAIN)));
  });
});
