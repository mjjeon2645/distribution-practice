// in this file you can append custom step methods to 'I' object
// 린트 에러로 인해 아샬님이 포맷을 살짝 바꿔두었으며 이를 그대로 옮겨옴

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  changeAmount({ userId, amount }) {
    this.amOnPage([
      `${backdoorBaseUrl}/change-amount`,
      `?userId=${userId}&amount=${amount}`,
    ].join(''));
    this.waitForText('ok');
  },

  transfer({ to, amount, name }) {
    this.amOnPage('/transfer');

    this.fillField('받는 분 계좌번호 :', to);
    this.fillField('보낼금액(원) :', amount);
    this.fillField('받는 분 통장 표시 :', name);
    this.click('보내기');

    this.waitForText('✅ 송금 완료!');
  },

  login(accountNumber) {
    this.amOnPage('/login');

    this.fillField('계좌번호', accountNumber);
    this.fillField('비밀번호', 'password');

    this.click('[type=submit]');
    // this.click('로그인하기');

    this.waitForText('로그아웃');
  },
});
