import styled from "styled-components";
import DatePicker from "react-datepicker";

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const FiltersInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const FiltersButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #800020;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const FiltersSelect = styled.select`
  width: calc(100% - 20px);
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
export const FiltersDatePicker = styled(DatePicker)`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; 

  @media (max-width: 768px) {
    width: 90%;
  }

  .react-datepicker__input-container input {
    width: 100%; 
    cursor: pointer;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    top: 8px;
  }
`;