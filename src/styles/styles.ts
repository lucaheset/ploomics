import styled from "styled-components";

interface ThumbnailData {
  thumbnail: {
    path: string;
    extension: string;
  };
}

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  
  border-radius: 10px;
`;

export const Card = styled.div<ThumbnailData>`
  background-color: #f1f1f1;
  height: 450px;
  width: 300px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 1 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  h2,
  p {
    margin-top: .3rem;
    padding: 5px;
    text-align: center;
   
  }
  p {
    padding: 70px 0;
    text-align: center;
    justify-content: center;
  }


  div#img {
    height: 400px;
    background-image: ${({ thumbnail }) =>
      `url(${thumbnail.path}.${thumbnail.extension})`};
    background-size: cover;

    transition: all 1s;
  }

  &:hover {
    div#img {
      height: 100px;
    }
  }
`;

export const DetailedCard = styled.div<ThumbnailData>`
  display: flex; /* This will make it a flex container */
  flex-direction: column; /* Align children vertically */
  align-items: center; /* Center children horizontally */
  justify-content: center; /* Center children vertically */
  background-color: #f1f1f1;
  height: 60%; /* Adjusted to 60% of its parent's height for better visibility */
  width: 40%; /* Adjusted to 40% of its parent's width for better visibility */
  margin: auto; /* This will center the card in the parent container */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 1 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative; /* Added for positioning of children absolute if needed */

  h2,
  p {
    text-align: center;
    width: 100%; 
  }

  p {
    padding: 1rem; /* Give some padding around the text */
  }

  div#img {
    width: 100%; /* Image should fill the width of the card */
    background-image: ${({ thumbnail }) =>
      `url(${thumbnail.path}.${thumbnail.extension})`};
    background-size: cover;
    background-position: center; /* Center the background image */
    transition: all 1s;
  }


`;