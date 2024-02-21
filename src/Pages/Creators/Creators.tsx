import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Storage/useAuth";
import { useLoading } from "../../Storage/useLoading";
import Header from "../../Components/Header";
import { Card, CardList, Container } from "../../styles/styles";
import Skeleton from "react-loading-skeleton";
import GlobalStyle from "../../styles/global";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_URL_CREATORS, hashCookies, ts } from "../../Constants";
import Loading from "../../Components/Loading";

const Creators = () => {
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [creators, setCreators] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const setIsLoading = useLoading((state) => state.setIsLoading);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL_CREATORS}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}&offset=${offset}`
      )
      .then((response) => {
        const newData = response.data.data.results;
        setIsAuthenticated(true);
        setCreators((prevCreators) => [...prevCreators, ...newData]);
        setHasMore(newData.length > 0);
        setOffset((prevOffset) => prevOffset + newData.length); // Atualizar o offset corretamente
        setLoading(false);
        console.log(newData)
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Erro ao carregar criadores.");
        setLoading(false);
      });
  };

  const fetchMoreData = () => {
    fetchData();
  };

  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Container>
        <GlobalStyle />
        <InfiniteScroll
          dataLength={creators.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading/>}
          endMessage={<p>Fim dos criadores</p>}
          scrollThreshold={0.9}
        >
          <CardList>
            {creators.map((creator: any) => (
              <Card thumbnail={{extension: creator.thumbnail.extension, path: creator.thumbnail.path}} key={creator.id}
              onClick={() => navigate(`/creators/${creator.id}`)}
              >
                <div
                  id="img"
                  style={{ backgroundImage: `url(${creator.thumbnail.path}.${creator.thumbnail.extension})` }}
                />
                <h2>{creator.fullName}</h2>
                <p>
                  Comics:{" "}
                  {creator.comics && creator.comics.items && creator.comics.items.length > 0 ? (
                    creator.comics.items.map((comic: any, index: number) => (
                      <span key={index}>
                        {typeof comic === "string" ? comic : comic && comic.name} {index < creator.comics.items.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <span>Não foram encontrados Comics desse Criador na base de dados.</span>
                  )}
                </p>
              </Card>
            ))}
          </CardList>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default Creators;
