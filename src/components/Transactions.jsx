import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

const Table = styled.table`
  width: 100%;
  border-top: 1px solid #D8D8D8;
  border-collapse: collapse;

    thead {
      background-color: #A79FFF;
      color: #FFF;
    }

    tbody {
      text-align: center;
      color: #B0B0B0;
    }

    th, td {
      border-bottom: 1px solid #D8D8D8;
      border-left: 1px solid #D8D8D8;
      padding: 10px;
    }

    th:first-child, td:first-child {
       border-left: none;
    } 

    td, th {
      padding: 1em;
    }
`;

const Container = styled.div`
  color: ${(props) => props.theme.colors.contentText};
  padding-inline: calc((100% - 500px) / 2);
  padding-block: calc((100% - 1000px) / 2);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  color: ${(props) => props.theme.colors.titleText};
  margin-bottom: 1em;
  padding-bottom: .5em;
  border-bottom: 1px solid #A79FFF;
`;

export default function Transactions() {
  const bankStore = useBankStore();

  const { transactions } = bankStore;

  if (!transactions.length) {
    return (
      <Container>
        <Title>거래내역</Title>
        <Table>
          <thead>
            <tr>
              <th>종류</th>
              <th>계좌번호</th>
              <th>금액(원)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">거래내역이 없습니다</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }

  return (
    <Container>
      <Title>거래내역</Title>
      <Table>
        <thead>
          <tr>
            <th>종류</th>
            <th>계좌번호</th>
            <th>금액(원)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.activity}</td>
              <td>{transaction.name}</td>
              <td>{numberFormat(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
