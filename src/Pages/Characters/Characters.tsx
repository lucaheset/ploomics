import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalStyle from "../../styles/global";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL_CHARACTERS, hashCookies, ts } from "../../Constants";
import Cookies from "js-cookie";
import { useAuth } from "../../Storage/useAuth";
import { useLoading } from "../../Storage/useLoading";
import { Container, CardList, Card } from "../../styles/styles";
import Header from "../../Components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Components/Loading";

const Characters = () => {
  const [characters, setCharacters] = useState<any[]>([]);

  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);

  const [comics, setComics] = useState<any[]>([]);

  function fetchData() {
    if (loading) return;
    setLoading(true);
    axios
      .get(
        `${BASE_URL_CHARACTERS}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}&offset=${offset}`
      )
      .then((response) => {
        const newData = response.data.data.results;
        const characterIds = new Set(comics.map((comic) => comic.id));
        const newUniqueCharacters = newData.filter(
          (character: { id: Number; }) => !characterIds.has(character.id)
        );

        setIsAuthenticated(true);
        setCharacters((prevCharacters) => [...prevCharacters, ...newUniqueCharacters]);
        setHasMore(newUniqueCharacters.length > 0);
        setOffset((prevOffset) => prevOffset + newUniqueCharacters.length);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
        setTimeout(() => {
          navigate('/')
        }, 2000);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchMoreData = () => {
    fetchData()
  }

  return (
    <div>
      <Header />
      <Container>
        <GlobalStyle />
        <InfiniteScroll
          dataLength={characters.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<p>Fim dos criadores</p>}
          scrollThreshold={0.9}
        >
        <CardList>
          {characters.map((character) => {
            return (
              <Card key={character.id} thumbnail={character.thumbnail}
              onClick={() => navigate(`/Character/${character.id}`)}
              >
                <div id="img" />
                <h2>{character.name}</h2>
                <p>
                  {character.description
                    ? character.description
                    : "This person does not have a description."}
                </p>
              </Card>
            );
          })}
        </CardList>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default Characters;


https://gateway.marvel.com:443/v1/public/characters?name=spiderman&apikey=
