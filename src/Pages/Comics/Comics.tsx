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
import { Card, CardList, Container } from "../../styles/styles";
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
        `${BASE_URL_COMICS}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}&offset=${offset}`
      )
      .then((response) => {
        const newData = response.data.data.results;
        const comicIds = new Set(comics.map((comic) => comic.id));
        const newUniqueComics = newData.filter(
          (comic: { id: Number; }) => !comicIds.has(comic.id)
        );

        setIsAuthenticated(true);
        setComics((prevComics) => [...prevComics, ...newUniqueComics]);
        setHasMore(newUniqueComics.length > 0);
        setOffset((prevOffset) => prevOffset + newUniqueComics.length);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
        navigate("/");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
          dataLength={comics.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<p>Fim dos criadores</p>}
          scrollThreshold={0.9}
        >
          <CardList>
            {comics.map((comic) => (
              <Card
                key={comic.id}
                thumbnail={comic.thumbnail}
                onClick={() => navigate(`/Comics/${comic.id}`)}
              >
                <div id="img" />
                <h2>{comic.title || <Skeleton width={30} />}</h2>
                <p>
                  Personagens:
                  {comic.characters.items.length > 0
                    ? comic.characters.items.map(
                        (character: any, index: number) => (
                          <span key={index}>
                            {character.name}{" "}
                            {index < comic.characters.items.length - 1 && ", "}
                          </span>
                        )
                      )
                    : "Não foram encontrados personagens na base de dados."}
                </p>
              </Card>
            ))}
          </CardList>
        </InfiniteScroll>
      </Container>
      <GlobalStyle />
    </div>
  );
};

export default Comics;
