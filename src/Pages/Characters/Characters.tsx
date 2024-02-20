import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalStyle from "../../styles/global";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL_CHARACTERS, hashCookies, ts } from "../../Constants";
import Cookies from "js-cookie";
import { useAuth } from "../../Storage/useAuth";
import { useLoading } from "../../Storage/useLoading";
import { Container, CardList, Card } from "./styles";
import Header from "../../Components/Header";

const Characters = () => {
  const [characters, setCharacters] = useState<any[]>([]);

  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL_CHARACTERS}ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const data = response.data.data.results;
        console.log(data);
        setCharacters(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <GlobalStyle />
        <CardList>
          {characters.map((character) => {
            return (
              <Card key={character.id} thumbnail={character.thumbnail}>
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
      </Container>
    </div>
  );
};

export default Characters;
