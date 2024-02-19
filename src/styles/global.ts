import { createGlobalStyle } from "styled-components";
import img from '../img/erik-mclean-8SeJUmfahu0-unsplash.jpg'

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-image: url(${img});
        background-size: 90%;
        background-color: #f0f2f5;
        background-position-x: center;
        font-family: Arial, Helvetica, sans-serif;
        
    }

`;

export default GlobalStyle