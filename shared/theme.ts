import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  fonts: {
    basic: "Readex Pro, sans-serif",
  },
  colors: {
    background: "#ffffff",
    footer: "#000000",
    heroGradient: "#ff6c75",
    heroBackground: "#ff0420",
    heroBackgroundStart: "#340000",
    heroBackgroundEnd: "#ff0420",
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#555555",
    network: "#ff0420",
    networkLight: "#ffeff0",
    lightGray: "#f6f6f6",
    gray: "#dddddd",
    darkGray: "#505050",
  },
  small_width: "768px",
  medium_width: "968px",
  max_width: "1280px",
};

export const darkTheme = {
  fonts: {
    basic: "Readex Pro, sans-serif",
  },
  colors: {
    background: "#000000",
    footer: "#1C1C1D",
    heroGradient: "#000000",
    heroBackground: "#282828",
    heroBackgroundStart: "#282828",
    heroBackgroundEnd: "#282828",
    primary: "#ffffff",
    secondary: "#1C1C1D",
    accent: "#bbbbbb",
    network: "#ffffff",
    networkLight: "#282828",
    lightGray: "#282828",
    gray: "#606060",
    darkGray: "#505050",
  },
  small_width: "768px",
  medium_width: "968px",
  max_width: "1280px",
};

export const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-y: overlay;
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.background}
    }

    *,
    *::after,
    *::before {
      font-family: ${({ theme }) => theme.fonts.basic};
      box-sizing: border-box; 
    }
    
    h1, h2, h3, h4, h5, h6 { margin: 0; }

    a { 
      text-decoration: none;
      color: ${({ theme }) => theme.colors.accent};
      cursor: pointer;
    }

    a:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
      cursor: pointer;
    }
    
    .main {
      padding: 70px 0 0;
      min-height: calc(100vh - 316px);

      @media (min-width: ${(props) => props.theme.small_width}) {
        min-height: calc(100vh - 247px); 
      }
    }

    .banner {
      padding: 120px 0 0;
    }
`;
