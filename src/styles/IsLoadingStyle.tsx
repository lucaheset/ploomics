import styled, { keyframes } from "styled-components";


export const LoadingDiv = styled.div`
  position: fixed;
  left: 48%;
  top: 50%;
  background-color: #802020;
  width: 30px;
  height: 30px;
  border-radius: 5px;

`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
    
  }

  to {
    transform: rotate(360deg);
  }
  
`;


export const Rotate = styled.div`
  position: relative;
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 0.15rem 0.95rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;



`;

