import AccountStore from './AccountStore';

describe('AccountStore', () => {
  test('create with all attributes', () => {
    const accountStore = new AccountStore({
      account: '1234',
      amount: 1_000,
      transactions: [],
    });

    expect(accountStore.account).toBe('1234');
    expect(accountStore.amount).toBe(1_000);
    expect(accountStore.transactions).toEqual([]);
  });

  test('create with only account', () => {
    const accountStore = new AccountStore({
      account: '1234',
    });

    expect(accountStore.account).toBe('1234');
    expect(accountStore.amount).toBe(0);
    expect(accountStore.transactions).toEqual([]);
  });
});
