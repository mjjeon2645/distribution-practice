import { render, screen } from '@testing-library/react';
import { bankStore } from '../stores/BankStore';
import Account from './Account';

test('Account', async () => {
  // 값들이 불러와지지 않아서 발생하는 테스트 에러 정정
  await bankStore.fetchAccount();

  render(<Account />);

  screen.getByText('잔액확인');

  screen.getByText(/이름 : tester/);
  screen.getByText(/계좌번호 : 1234/);
  // screen.getByText(/잔액 : 100,000원/);
});
