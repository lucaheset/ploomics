import styled from "styled-components";

export const Sidebar = styled.div`
  position: fixed; 
  left: 0;
  top: 0;
  background-color: #800020;
  width: 10%;
  height: 100vh; 
  padding-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const SidebarInput = styled.input`
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  border: none;
  background-color: #DCDCDC;
  color: #333;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-top: 75%;
`;

export const SideBarButton = styled.button`
  display: block;
  margin: 10px auto;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  width: 148px;

  &:hover {
    background-color: #0056b3;
  }
`;