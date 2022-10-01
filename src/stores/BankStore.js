import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.listeners = new Set();

    this.accountNumber = '';
    this.name = '';
    this.amount = 0;
    this.transactions = [];

    this.transferState = '';

    this.errorCode = 0;
    this.errorMessage = '';

    this.accessToken = '';
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async login({ accountNumber, password }) {
    try {
      const { accessToken, name, amount } = await apiService.postSession({
        accountNumber, password,
      });

      this.name = name;
      this.amount = amount;

      this.accessToken = accessToken;

      return accessToken;
    } catch (e) {
      return e.response.data;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async requestSignUp({
    name, accountNumber, password, checkPassword,
  }) {
    try {
      const newAccount = await apiService.createAccount({
        name, accountNumber, password, checkPassword,
      });

      this.name = newAccount.userName;
      this.accountNumber = newAccount.userAccountNumber;

      const { userAccountNumber } = newAccount;

      return userAccountNumber;
    } catch (e) {
      const { message } = e.response.data;
      return message;
    }
  }

  // changeSignUpState(state, { errorMessage = '' }) {
  //   this.siggUpState = state;
  //   this.signUpErrorMessage = errorMessage;
  //   this.publish();
  // }

  async fetchAccount() {
    const { name, accountNumber, amount } = await apiService.fetchAccount();

    this.name = name;
    this.accountNumber = accountNumber;
    this.amount = amount;

    this.publish();
  }

  async requestTransfer({ to, amount, name }) {
    this.changeTransferState('processing');

    try {
      await apiService.createTransaction({ to, amount, name });
      this.changeTransferState('success');
    } catch (e) {
      const { code, message } = e.response.data;
      this.changeTransferState('fail', { errorCode: code, errorMessage: message });
      setTimeout(() => this.changeTransferState(''), 2000);
    }
  }

  changeTransferState(state, { errorCode = 0, errorMessage = '' } = {}) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.transferState = state;
    this.publish();
  }

  async fetchTransactions() {
    this.transactions = [];
    this.publish();

    this.transactions = await apiService.fetchTransactions();
    this.publish();
  }

  get isTransferProcessing() {
    return this.transferState === 'processing';
  }

  get isTransferSuccess() {
    return this.transferState === 'success';
  }

  get isTransferFail() {
    return this.transferState === 'fail';
  }

  get isCheckPasswordRight() {
    return this.signUpState === 'fail';
  }
}

export const bankStore = new BankStore();
