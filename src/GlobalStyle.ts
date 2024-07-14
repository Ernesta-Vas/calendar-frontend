import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(135deg, #fddde6, #2c3e50);
    color: #333;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;

    @media (max-width: 768px) {
      padding: 10px;
    }
  }
`;
