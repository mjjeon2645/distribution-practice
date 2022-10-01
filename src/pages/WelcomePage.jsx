import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../components/ui/PrimaryButton';
import useBankStore from '../hooks/useBankStore';

const Container = styled.div`
text-align: center;
  color: ${(props) => props.theme.colors.contentText};
  padding-inline: calc((100% - 350px) / 2);
  padding-block: calc((100% - 1000px) / 2);
  display: flex;
  flex-direction: column;
  p {
    padding-block: 1em;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 2em;
  color: ${(props) => props.theme.colors.titleText};
  border-bottom: 1px solid #A79FFF;
  padding-bottom: .5em;
`;

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const bankStore = useBankStore();
  return (
    <Container>
      <Title>WELCOME</Title>
      <p>
        환영합니다,
        {' '}
        {bankStore.name}
        {' '}
        회원님!
      </p>
      <p>회원님의 계좌번호는</p>
      <p>
        {bankStore.accountNumber}
        입니다.
      </p>
      <p>이제 마카오뱅크와 함께</p>
      <p>똑똑한 소비습관을 길러보아요!</p>
      <PrimaryButton type="button" onClick={handleClick}>
        로그인하기
      </PrimaryButton>
    </Container>
  );
}
