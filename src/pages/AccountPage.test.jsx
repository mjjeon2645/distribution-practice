import { render, screen, waitFor } from '@testing-library/react';
import AccountPage from './AccountPage';

test('AccountPage', async () => {
  render(<AccountPage />);

  // AccountPage의 경우 이미 useEffect를 통해 fetchAccount 하고 있음에도 불구하고
  // 그냥 테스트를 돌리면 값이 불러와지지 않았다며 테스트가 깨지는 현상
  // 이를 잡아주기 위해 값이 불러와질 때까지 기다려주는 waitFor 사용

  await waitFor(() => {
    screen.getByText('잔액확인');

    screen.getByText(/이름 : tester/);
  });
});
