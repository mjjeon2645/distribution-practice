Feature('송금 - 고객은 본인 계좌에서 다른 사람에게 돈을 보내기 위해 송금 서비스를 이용할 수 있다.');

function numberFormat(number) {
  return Intl.NumberFormat().format(number);
}

const amount = 1000000;
// Given
Before(({ I }) => {
  // TODO: 계좌 설정
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount });

  I.login('1234');

  I.amOnPage('/');

  I.click('송금');
});

Scenario('올바르게 송금이 된 경우', ({ I }) => {
  const transferAmount = 200000;

  // When
  I.fillField('받는 분 계좌번호 :', '5678');
  I.fillField('보낼금액(원) :', transferAmount);
  I.fillField('받는 분 통장 표시 :', 'tester');
  I.click('보내기');

  // Then
  I.see('✅ 송금 완료!');

  I.click('잔액확인');
  I.see(`잔액 : ${numberFormat(amount - transferAmount)}원`);
});

Scenario('잔액이 부족한 경우', ({ I }) => {
  // When
  I.fillField('받는 분 계좌번호 :', '5678');
  I.fillField('보낼금액(원) :', amount + 10000);
  I.fillField('받는 분 통장 표시 :', 'tester');
  I.click('보내기');

  // Then
  I.see('금액이 잘못 됐습니다');
});

Scenario('계좌 번호가 잘못된 경우', ({ I }) => {
  I.fillField('받는 분 계좌번호 :', '틀린계좌');
  I.fillField('보낼금액(원) :', 3000);
  I.fillField('받는 분 통장 표시 :', 'tester');
  I.click('보내기');

  // Then
  I.see('계좌 번호가 잘못됐습니다');
});
