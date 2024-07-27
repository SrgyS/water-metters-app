import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
${normalize}
  body {
    font-family: Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    font-size: 14px;
  }
`;
