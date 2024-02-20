import styled from 'styled-components';


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 1rem;
  justify-content: center;
  margin-left: 500px;
  margin-top: 50px;
  
  
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  border: none;
  
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

