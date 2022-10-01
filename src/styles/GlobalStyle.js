import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    max-width: 1440px;
  }

  a {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
