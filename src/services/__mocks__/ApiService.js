/* eslint-disable class-methods-use-this */
// 모킹용

export default class ApiService {
  async postSession({ accountNumber, password }) {
    if (accountNumber === '1234' && password === 'password') {
      return {
        accessToken: 'ACCESS.TOKEN',
        name: 'tester',
        amount: 100_000,
      };
    }
    throw new Error('Login failed');
  }
}

export const apiService = new ApiService();
