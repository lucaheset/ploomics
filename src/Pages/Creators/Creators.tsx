import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import { Card, CardList, Container } from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_URL_CREATORS, hashCookies, ts } from "../../Constants";
import Loading from "../../Components/Loading";
import SideBar from "../../Components/SideBar";

const Creators = () => {
  const navigate = useNavigate();

  const [creators, setCreators] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [qtd, setQtd] = useState(0);


  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData(search?: string, newSearch: boolean = false, offset: number = 0) {
    if (loading) return;


    if (newSearch) {
      setCreators([]);
      setQtd(0);
    }

    setLoading(true);

    const requestURL = search
    ? `${BASE_URL_CREATORS}?firstNameStartsWith=${search}&ts=${ts}&apikey=${Cookies.get(
        "UserPublicApi"
      )}&hash=${hashCookies}&offset=${offset}`
    : `${BASE_URL_CREATORS}?ts=${ts}&apikey=${Cookies.get(
        "UserPublicApi"
      )}&hash=${hashCookies}&offset=${offset}`;

      axios
      .get(requestURL)
      .then((response) => {
        setLoading(false);
        const newData = response.data.data.results;
  
        if (newSearch || (offset === 0 && creators.length === 0)) {
          setCreators(newData);
        } else {
      
          setCreators((prevCreators) => {
            const filteredData = newData.filter(
              (newCreator: { id: number }) =>
                !prevCreators.some(
                  (prevComic) => prevComic.id === newCreator.id
                )
            );
            return [...prevCreators, ...filteredData];
          });
        }
  
        setHasMore(newData.length > 0);
        if (!newSearch || !search) {
          setQtd((prevOffset) => prevOffset + 19);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
    }


    const onNewSearchValue = (newValue: string) => {
      setSearchValue(newValue);
      fetchData(newValue, true);
    };

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      fetchData(searchValue, false, qtd);
    }
  
  };

  const t = 16;

    const threshold = (qtd - t) / qtd;
  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Container>
        <GlobalStyle />
        <SideBar onSearchClick={onNewSearchValue} />
        <InfiniteScroll
          dataLength={creators.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading/>}
          endMessage={<h2>Fim dos criadores</h2>}
          scrollThreshold={threshold}
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
