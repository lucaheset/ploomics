import { createGlobalStyle } from "styled-components";;


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap');


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Marvel", sans-serif;
        font-weight: 700;
        font-style: normal;
    }

    body {

      @media only screen and (min-width: 1024px) {
  .container header .header-nav-area #nav_container  {
    display:flex;
   }
  }
        background-image: url('/img/background.jpg');
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

      html::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      html::-webkit-scrollbar-track {
        background: #801;
      }

      html::-webkit-scrollbar-thumb {
        background: #f88;
        transition: 0.5s;
      }

      html::-webkit-scrollbar-thumb:hover {
        background: #f55;
    
      }


`;

export default GlobalStyle;
