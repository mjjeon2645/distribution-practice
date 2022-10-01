Feature('로그인');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount: 10000 });
  I.changeAmount({ userId: 2, amount: 33000 });
});

Scenario('1번 사용자 로그인', ({ I }) => {
  // When
  I.amOnPage('/');
  I.click('로그인');
  I.fillField('계좌번호', '1234');
  I.fillField('비밀번호', 'password');
  I.click('[type=submit]');

  // Then
  I.click('잔액확인');
  I.see('계좌번호 : 1234');
  I.see('잔액 : 10,000원');
});

Scenario('2번 사용자 로그인', ({ I }) => {
  // When
  I.amOnPage('/');
  I.click('로그인');
  I.fillField('계좌번호', '5678');
  I.fillField('비밀번호', 'password');
  I.click('[type=submit]');

  // Then
  I.click('잔액확인');
  I.see('계좌번호 : 5678');
  I.see('잔액 : 33,000원');
});
