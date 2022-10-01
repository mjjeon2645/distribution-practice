import { render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';

test('SignUpPage', () => {
  render(<SignUpPage />);

  screen.getByText('SIGN UP');
  screen.getByText('회원가입');
});
