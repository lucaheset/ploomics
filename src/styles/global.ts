import styled, { createGlobalStyle } from "styled-components";
import img from "../img/erik-mclean-8SeJUmfahu0-unsplash.jpg";

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Marvel", sans-serif;
        font-weight: 700;
        font-style: normal;
    }

    body {
        background-image: url(${img});
        background-size: 90%;
        background-color: #f0f2f5;
        background-position-x: center;

        
        
    }
    .marvel-regular {
        font-family: "Marvel", sans-serif;
        font-weight: 400;
        font-style: normal;
      }
      
      .marvel-bold {
        font-family: "Marvel", sans-serif;
        font-weight: 700;
        font-style: normal;
      }
      
      .marvel-regular-italic {
        font-family: "Marvel", sans-serif;
        font-weight: 400;
        font-style: italic;
      }
      
      .marvel-bold-italic {
        font-family: "Marvel", sans-serif;
        font-weight: 700;
        font-style: italic;
      }

`;

export default GlobalStyle;
