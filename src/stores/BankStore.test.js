import { waitFor } from '@testing-library/react';
import server from '../testServer';
import BankStore from './BankStore';

// 1. 직접 모킹
// jest.mock('../services/ApiService', () => ({
//   apiService: {
//     async postSession({ accountNumber, password }) {
//       if (accountNumber === '1234' && password === 'password') {
//         return {
//           accessToken: 'ACCESS.TOKEN',
//           name: 'tester',
//           amount: 100_000,
//         };
//       }
//       throw new Error('Login failed');
//     },
//   },
// }));

// 2. __mocks__ 폴더에 완벽한 모킹파일이 있으니 이렇게 간단하게 써줘도 됨
// jest.mock('../services/ApiService');

// 3. MSW 사용하여 모킹. 현재 사용중

const context = describe;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('BankStore', () => {
  let bankStore;

  beforeEach(() => {
    bankStore = new BankStore();
  });

  describe('login', () => {
    context('with correct account number and password', () => {
      it('loads account information', async () => {
        await bankStore.login({ accountNumber: '1234', password: 'password' });

        expect(bankStore.name).toBe('tester');
        expect(bankStore.amount).toBe(100_000);
      });
    });

    context('with incorrect account number', () => {
      it('loads account information', async () => {
        await bankStore.login({ accountNumber: 'xxx', password: 'password' });

        expect(bankStore.name).toBeFalsy();
        expect(bankStore.amount).toBe(0);
      });
    });
  });

  describe('fetchAccount', () => {
    it('sets account information', async () => {
      await bankStore.fetchAccount();

      expect(bankStore.name).toBe('tester');
      expect(bankStore.accountNumber).toBe('1234');
      expect(bankStore.amount).toBe(100_000);
    });
  });

  describe('requestTransfer', () => {
    context('when request is successful', () => {
      async function request() {
        await bankStore.requestTransfer({
          to: '1234',
          amount: 100,
          name: 'test',
        });
      }

      it('sets transfer state to "processing" and "success"', async () => {
        request();

        expect(bankStore.isTransferProcessing).toBeTruthy();

        await waitFor(() => {
          expect(bankStore.isTransferSuccess).toBeTruthy();
        });
      });

      it('does not set error message"', async () => {
        request();

        expect(bankStore.errorMessage).toBeFalsy();
      });
    });

    context('when request is failed', () => {
      async function request() {
        await bankStore.requestTransfer({
          to: '1234',
          amount: -100,
          name: 'test',
        });
      }

      it('sets transfer state to "processing" and "fail"', async () => {
        request();

        expect(bankStore.isTransferProcessing).toBeTruthy();

        await waitFor(() => {
          expect(bankStore.isTransferFail).toBeTruthy();
        });
      });

      it('sets error message', async () => {
        await request();

        expect(bankStore.errorMessage).toBeTruthy();
      });
    });
  });
});
