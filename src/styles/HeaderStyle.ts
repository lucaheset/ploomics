import styled from "styled-components";

export const Headers = styled.div`
  font-family: "Marvel", sans-serif;
  font-weight: 700;
  font-style: italic;
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  background-color: #fcfcfc;
  width: 1200px;
  border: none;
  border-radius: 5px;
  height: 50px;
  margin-bottom: 20px;
  width: 100%;
  padding: 2rem;
 

  .logout {
  }
  .link-style {
    display: flex;
    width: 100px;
    height: 35px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    text-decoration: none;
    color: #000000;
    font-size: 14px;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #800020;
      color: #fcfcfc;
    }
  }

`;
