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
  padding-left: 10%;
  box-sizing: border-box;
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Card = styled.div<ThumbnailData>`

background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
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
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  background-color: #f1f1f1;
  height: 60%; 
  width: 40%; 
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 1 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative; 

  h2,
  p {
    text-align: center;
    width: 100%; 
  }

  p {
    padding: 1rem; 
  }

  div#img {
    width: 100%; 
    background-image: ${({ thumbnail }) =>
      `url(${thumbnail.path}.${thumbnail.extension})`};
    background-size: cover;
    background-position: center;
    transition: all 1s;
  }



`


;