import styled from "styled-components";

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fcfcfc;
  width: 12%;
  height: 100vh;
  padding-top: 20px;

  h1 {
    font-size: 135%;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    font-style: normal;
    span {
      color: red;
      font-family: "Poppins", sans-serif;
      font-weight: bold;
      font-style: normal;
    }
  }

  @media (max-width: 768px) {
    width: 30%;
  }
`;

export const SidebarInput = styled.input`
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  border: none;
  background-color: #dcdcdc;
  color: #333;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 200px;
`;

export const SideBarButton = styled.button`
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #800020;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  width: 80%;
  max-width: 200px;

  &:hover {
    opacity: 70%;
  }
`;
