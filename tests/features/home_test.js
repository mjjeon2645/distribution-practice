Feature('Home Page 방문 - 고객은 마카오뱅크 서비스를 이용하기 위해 홈페이지 메인화면에 접속할 수 있다');

Scenario('Visit the Home Page without Login', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('마카오뱅크에서');
});
