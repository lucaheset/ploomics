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

export const FavoriteButton = styled.button`
  background: url("/svg/heart.svg");
  border: none;
  background-size: contain;
  position: absolute;
  top: 2%;
  right: 4%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 9999;
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Card = styled.div<ThumbnailData>`
  position: relative;
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
    margin-top: 0.3rem;
    @media only screen and (min-width: 1024px) {
      .container header .header-nav-area #nav_container {
        display: flex;
      }
    }
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
  height: 80vh;
  width: 80vw;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 1 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative;
  padding: 15px;

  h2,
  p {
    text-align: center;
    width: 100%;
  }

  p {
    padding: 1rem;
  }
img {
  max-width: 40%;
}

`;
