import React, { useEffect, useState } from "react";
import {
  BASE_URL_CHARACTERS,
  BASE_URL_CREATORS,
  CookiesName,
  hashCookies,
  ts,
} from "../../Constants";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Storage/useAuth";
import { useLoading } from "../../Storage/useLoading";
import Header from "../../Components/Header";
import { Card, CardList, Container } from "../Characters/styles";
import Skeleton from "react-loading-skeleton";
import GlobalStyle from "../../styles/global";

const Creators = () => {
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const navigate = useNavigate();

  const [creators, setCreators] = useState([]);

  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);

  function fetchData() {
    axios
      .get(
        `${BASE_URL_CREATORS}ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const creatorData = response.data.data.results;
        setIsAuthenticated(true);
        setIsLoading(false);
        setCreators(creatorData);
        console.log(creatorData)
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
        navigate("/");
      });
  }

  useEffect(() => {
    {
      fetchData();
    }
  }, []);

  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Container>
        <GlobalStyle />
        <CardList>
          {creators.map((creators: any) => {
            return (
              <Card key={creators.id} thumbnail={creators.thumbnail}>
                <div id="img" />
                <h2>{creators.fullName}</h2>
                <p>
                  Personagens:
                  {creators.comics.items.length > 0
                    ? creators.comics.items.map(
                        (comics: any, index: number) => (
                          <span key={index}>
                            {typeof comics === "string"
                              ? comics
                              : comics && comics.name}{" "}
                            {index < creators.characters.items.length - 1 && ", "}
                          </span>
                        )
                      )
                    : "Não foram encontrados personagens na base de dados."}
                </p>
             
              </Card>
            );
          })}
        </CardList>
      </Container>
      <GlobalStyle />
    </div>
  );
};

export default Creators;
