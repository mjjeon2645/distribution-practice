import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  color: ${(props) => props.theme.colors.contentText};
  padding-inline: calc((100% - 300px) / 2);
  padding-block: calc((100% - 1000px) / 2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Title = styled.h2`
  display: block;
  width: 100%;
  font-weight: bold;
  font-size: 2em;
  border-bottom: 1px solid #A79FFF;
  margin-bottom: 1em;
  padding-bottom: 1em;
  color: ${(props) => props.theme.colors.titleText};
  align-self: center;
`;

const Element = styled.p`
  padding: 1em;
  strong {
    font-weight: bold;
  }
`;

export default function Account() {
  const bankStore = useBankStore();

  return (
    <Container>
      <Title>잔액확인</Title>
      <Element>
        <strong>이름 :</strong>
        {' '}
        {bankStore.name}
      </Element>
      <Element>
        <strong>계좌번호 :</strong>
        {' '}
        {bankStore.accountNumber}
      </Element>
      {bankStore.amount > 0 ? (
        <Element>
          <strong>잔액 :</strong>
          {' '}
          {numberFormat(bankStore.amount)}
          원
        </Element>
      ) : (
        <p>잔액이 없습니다</p>
      )}
    </Container>
  );
}
