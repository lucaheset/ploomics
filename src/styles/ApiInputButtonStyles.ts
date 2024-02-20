import styled from 'styled-components';

export const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  background-color: #880808;
  padding: 20px;
  width: 300px;
  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  border: none;
  background-color: #DCDCDC;
  color: #333;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;