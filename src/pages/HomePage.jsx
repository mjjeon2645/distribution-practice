import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import PrimaryButton from '../components/ui/PrimaryButton';
import Main from '../assets/main.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: calc((100% - 1000px) / 2);
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
  p {
    margin-top: .3em;
  }
`;

const Buttons = styled.ul`
  display: flex;
  margin-top: 3em;

  li {
    margin-right: 3em;
  }
`;

const Image = styled.img`
  width: 40vh;
  margin-left: 5em;
`;

export default function HomePage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const handleGoTransfer = () => {
    if (accessToken) {
      navigate('/transfer');
      return;
    }

    alert('로그인을 해 주세요!');
  };

  const handleGoTransactions = () => {
    if (accessToken) {
      navigate('/transactions');
      return;
    }

    alert('로그인을 해 주세요!');
  };

  return (
    <Container>
      <div>
        <Title>
          <p>마카오뱅크에서</p>
          <p>똑똑한 금융습관을 들이세요</p>
        </Title>
        <Buttons>
          <li>
            <PrimaryButton type="button" onClick={handleGoTransfer}>송금하기</PrimaryButton>
          </li>
          <li>
            <PrimaryButton type="button" onClick={handleGoTransactions}>거래내역조회</PrimaryButton>
          </li>
        </Buttons>
      </div>
      <div>
        <Image src={Main} alt="" />
      </div>
    </Container>
  );
}
