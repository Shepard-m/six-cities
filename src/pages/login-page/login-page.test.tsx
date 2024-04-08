import { withHistory } from '../../utils/mock-component';
import LoginPage from './login-page';
import { render, screen } from '@testing-library/react';

describe('LoginPage', () => {
  it('should return component LoginPage the correct input fields', () => {
    const loginPageTest = withHistory(<LoginPage navigation={false} />);
    render(loginPageTest);

    const passwordInput = screen.getByPlaceholderText('Password');
    const emailInput = screen.getByPlaceholderText('Email');
    const loginPageTestId = screen.getByTestId('login-page');

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(loginPageTestId).toBeInTheDocument();
  });
});
