import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { defaultTheme } from '../../styles/theme';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const GlobalStyle = React.memo(createGlobalStyle<{
  theme: typeof defaultTheme;
}>`
  html,
  body {
      color: ${(p) => p.theme.text};
  }
  #root {
      height: 100vh;
      width: 100%;
      box-sizing: border-box;
      background: ${(p) => p.theme.background};
  }
`);

const Wrapper = styled.div`
    height: 100%;
    margin: auto;
    padding: 2rem 0;
    max-width: 1440px;
    box-sizing: border-box;
    overflow: auto;
`;

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Wrapper>
        {children}
      </Wrapper>
    </ThemeProvider>
  )
}

export default DefaultLayout;