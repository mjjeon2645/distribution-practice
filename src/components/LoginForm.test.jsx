/* eslint-disable react/prop-types */
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import LoginForm from './LoginForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('LoginForm', async () => {
  render((
    <ThemeProvider theme={defaultTheme}>
      <LoginForm />
    </ThemeProvider>
  ));

  screen.getByRole('heading', { name: '로그인' });

  fireEvent.change(screen.getByLabelText('계좌번호'), {
    target: { value: '1234' },
  });

  fireEvent.change(screen.getByLabelText('비밀번호'), {
    target: { value: 'password' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/');
  });
});
