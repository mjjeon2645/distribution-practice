import TransferStore from './TransferStore';

const context = describe;

describe('TransferStore', () => {
  context('when amount is correct', () => {
    it('updates amount', () => {
      const transferStore = new TransferStore();

      expect(transferStore.amount('1234')).toBe(3_000);
      expect(transferStore.amount('5678')).toBe(0);

      transferStore.transfer('1234', '5678', 1_000);

      expect(transferStore.amount('1234')).toBe(2_000);
      expect(transferStore.amount('5678')).toBe(1_000);
    });
  });

  context('when amount is too large', () => {
    it('updates amount', () => {
      const transferStore = new TransferStore();

      expect(transferStore.amount('1234')).toBe(3_000);
      expect(transferStore.amount('5678')).toBe(0);

      transferStore.transfer('1234', '5678', 10_000);

      expect(transferStore.amount('1234')).toBe(3_000);
      expect(transferStore.amount('5678')).toBe(0);
    });
  });
});
