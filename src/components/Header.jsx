/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import PrimaryButton from './ui/PrimaryButton';

import light from '../assets/sun.png';
import dark from '../assets/moon.png';

const Container = styled.header`
width: 100%;
padding: 1em;
display: flex;
justify-content: space-between;

background: linear-gradient( to right, 
  ${(props) => props.theme.colors.panelStart}, 
  ${(props) => props.theme.colors.panelEnd} );

  nav {
    ul {
      display: flex;
    }

    li {
      margin-right: .5em;
    }
  }
`;

const Menus = styled.nav`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-left: 5em;
`;

const SubMenus = styled.nav`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 5em;
`;

const Menu = styled.span`
  color: #FFF;
  text-decoration: none;
`;

const LightButton = styled.button`
   background: transparent;
    border: none;
    width: 50%;
    img {
      width: 50%;
    }
`;

const DarkButton = styled.button`
   background: transparent;
    border: none;
    width: 50%;
    img {
      width: 50%;
    }
`;

export default function Header({ handleThemeClick, themeName }) {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <Menus>
        <ul>
          <li>
            <Link to="/">
              <Menu>홈</Menu>
            </Link>
          </li>
          {accessToken ? (
            <>
              <li>
                <Link to="/account">
                  <Menu>잔액확인</Menu>
                </Link>
              </li>
              <li>
                <Link to="/transfer">
                  <Menu>송금</Menu>
                </Link>
              </li>
              <li>
                <Link to="/transactions">
                  <Menu>거래내역</Menu>
                </Link>
              </li>
            </>
          ) : ('')}
        </ul>
      </Menus>
      <SubMenus>
        <ul>
          {themeName === 'default' ? (
            <li>
              <LightButton type="button" onClick={handleThemeClick}>
                <img src={light} alt="" />
              </LightButton>
            </li>
          ) : (
            <li>
              <DarkButton type="button" onClick={handleThemeClick}>
                <img src={dark} alt="" />
              </DarkButton>
            </li>
          )}
          {accessToken ? (
            <li>
              <PrimaryButton type="button" onClick={handleLogout}>로그아웃</PrimaryButton>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">
                  <PrimaryButton type="button">회원가입</PrimaryButton>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <PrimaryButton type="button">로그인</PrimaryButton>
                </Link>
              </li>
            </>
          )}
        </ul>
      </SubMenus>
    </Container>
  );
}
