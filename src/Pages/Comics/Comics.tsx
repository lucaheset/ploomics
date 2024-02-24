import GlobalStyle from "../../styles/global";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Card, CardList, Container, FavoriteButton } from "../../styles/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Components/Loading";
import { useLoading } from "../../Storage/useLoading";
import { BASE_URL_COMICS, getAuthQueryString } from "../../Constants";
import Skeleton from "react-loading-skeleton";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import { Comic } from "../../Constants/types";
import Cookies from "js-cookie";

const Comics = () => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [qtd, setQtd] = useState(0);

  const isLoading = useLoading((state) => state.isLoading);

  const [comics, setComics] = useState<Comic[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const [filterYear, setFilterYear] = useState<number | null>(null);

  function fetchData(
    search?: string,
    newSearch: boolean = false,
    offset: number = 0
  ) {
    if (loading) return;

    if (newSearch) {
      setComics([]);
      setQtd(0);
    }

    setLoading(true);

    let requestURL = search
      ? `${BASE_URL_COMICS}?titleStartsWith=${search}&${getAuthQueryString()}&offset=${offset}`
      : `${BASE_URL_COMICS}?${getAuthQueryString()}&offset=${offset}`;

    if (filterYear) {
      requestURL = `${BASE_URL_COMICS}?startYear=${filterYear}&${getAuthQueryString()}&offset=${offset}&limit=100`;
      
    }
    axios
      .get(requestURL)
      .then((response) => {
        newSearch = false;
        setLoading(false);
        const newData = response.data.data.results;

        if (newSearch || (offset === 0 && comics.length === 0)) {
          setComics(newData);
        } else {
          setComics((prevComics) => {
            const filteredData = newData.filter(
              (newComic: { id: number }) =>
                !prevComics.some((prevComic) => prevComic.id === newComic.id)
            );
            return [...prevComics, ...filteredData];
          });
        }
        setHasMore(newData.length > 0);

        if (!newSearch || !search) {
          setQtd((prevOffset) => prevOffset + 19);
        }
      })
      .catch((error) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      fetchData(searchValue, false, qtd);

    }
  };

  const handleComicsFetched = (newComics: Comic[], year?: number): void => {
    setQtd(0);
    setComics([]);
    setComics(newComics);
    setHasMore(newComics.length > 0);
    
    if (year) setFilterYear(year);
  };
  const t = 16;
  const threshold = (qtd - t) / qtd;

  function handleFavoriteItem(id: number) {
    let favoriteList: string[] = JSON.parse(Cookies.get('FavoriteList') || '[]');
    
    if (favoriteList.includes(String(id))) {
        return;
    } else {
        favoriteList.push(String(id));
        const newFavoriteList = JSON.stringify(favoriteList);
        Cookies.set('FavoriteList', newFavoriteList, { expires: 7, path: '' });
    }
}

  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <SideBar
        onComicsFetched={handleComicsFetched}
        setComics={setComics}
        onSearchClick={onNewSearchValue}
      />
      <Container>
        <GlobalStyle />
        <InfiniteScroll
          dataLength={comics.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<p>Fim das HQS</p>}
          scrollThreshold={threshold}
        >
          <CardList>
            {comics.map((comic) => (
              <Card key={comic.id} thumbnail={comic?.thumbnail}>
                <FavoriteButton onClick={() => handleFavoriteItem(comic.id)} />
                <div
                onClick={() => navigate(`/comics/${comic.id}`)}
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
                              {index < comic.characters.items.length - 1 &&
                                ", "}
                            </span>
                          )
                        )
                      : "There wasn't any characters in the DataBase"}
                  </p>
                </div>
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
