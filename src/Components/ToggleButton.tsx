import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';

const Button = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleButton = () => {
  const { toggleTheme } = useTheme();

  console.log("cliquei")

  return <Button onClick={toggleTheme}>Alternar Tema</Button>;
};

export default ToggleButton;