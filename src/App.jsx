import { Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import Header from './components/Header';
import AccountPage from './pages/AccountPage';

import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import TransferPage from './pages/TransferPage';
import defaultTheme from './styles/defaultTheme';
import darkTheme from './styles/darkTheme';
import GlobalStyle from './styles/GlobalStyle';
import LoginPage from './pages/LoginPage';
import { apiService } from './services/ApiService';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';

const Container = styled.div`
  max-width: 1440px;
  min-width: 1024px;
  min-height: 100vh;
  /* padding-inline: calc((100% - 1000px) / 2); */
`;

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default');
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  const handleClick = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <Header handleThemeClick={handleClick} themeName={themeName} />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Container>
  );
}
