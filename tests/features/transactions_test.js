Feature('거래내역 확인 - 고객은 고객의 계좌로 돈이 거래된 내역을 확인하고 싶다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount: 1000000 });

  I.login('1234');
});

Scenario('거래내역이 없는 경우', ({ I }) => {
  // Given
  I.login('1234');

  // When
  I.amOnPage('/');
  I.click('거래내역');

  // Then
  I.see('거래내역이 없습니다');
});

Scenario('내가 보낸 거래 내역이 있는 경우', ({ I }) => {
  // Given
  I.login('1234');
  I.transfer({ to: '5678', amount: 5000, name: 'tester' });

  // When
  I.amOnPage('/');
  I.click('거래내역');

  // Then
  I.see('송금\t5678\t5,000');
});

Scenario('내가 받은 거래 내역이 있는 경우', ({ I }) => {
  // Given
  I.login('1234');
  I.transfer({ to: '5678', amount: 5000, name: 'tester' });
  I.login('5678');

  // When
  I.amOnPage('/');
  I.click('거래내역');

  // Then
  I.see('입금\ttester\t5,000');
});
