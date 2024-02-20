import React from "react";
import { Link } from "react-router-dom";
import GlobalStyle from "../../styles/global";
import { useAuth } from "../../Storage/useAuth";
import axios from "axios";
import md5 from "md5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { Card, CardList, Container } from "../Characters/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { Rotate } from "../../styles/IsLoadingStyle";
import Loading from "../../Components/Loading";
import { useLoading } from "../../Storage/useLoading";
import { BASE_URL_COMICS, CookiesName, hashCookies, ts } from "../../Constants";
import Skeleton from "react-loading-skeleton";
import Header from "../../Components/Header";

const Comics = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);

  const [page, setPage] = useState(1);

  const [comics, setComics] = useState<any[]>([]);

  function fetchData() {
    axios
      .get(
        `${BASE_URL_COMICS}ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        setComics(response.data.data.results);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
        navigate("/");
      });
  }

  console.log("entrou na pagina setapi shaodre");
  useEffect(() => {
    {
      fetchData();
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Container>
        <GlobalStyle />
        <CardList>
          {comics.map((comics) => {
            return (
              <Card key={comics.id} thumbnail={comics.thumbnail}>
                <div id="img" />
                <h2>{comics.title || <Skeleton width={30} />}</h2>
                <p>
                  Personagens:
                  {comics.characters.items.length > 0
                    ? comics.characters.items.map(
                        (character: any, index: number) => (
                          <span key={index}>
                            {typeof character === "string"
                              ? character
                              : character && character.name}{" "}
                            {index < comics.characters.items.length - 1 && ", "}
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

export default Comics;
