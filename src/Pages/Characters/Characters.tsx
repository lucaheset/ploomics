import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../styles/global";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL_CHARACTERS, hashCookies, ts } from "../../Constants";
import Cookies from "js-cookie";
import { Container, CardList, Card } from "../../styles/styles";
import Header from "../../Components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Components/Loading";
import SideBar from "../../Components/SideBar";

const Characters = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [qtd, setQtd] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  function fetchData(
    search?: string,
    newSearch: boolean = false,
    offset: number = 0
  ) {
    if (loading) return;

    setLoading(true);

    if (newSearch || (offset === 0 && characters.length === 0)) {
      setCharacters([]);
      setQtd(0);
    }

    const requestURL = search
      ? `${BASE_URL_CHARACTERS}?nameStartsWith=${search}&ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}&offset=${offset}`
      : `${BASE_URL_CHARACTERS}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}&offset=${offset}`;
    console.log("URL:", requestURL);

    axios
      .get(requestURL)
      .then((response) => {
        setLoading(false);
        const newData = response.data.data.results;
        if (newSearch || (offset === 0 && characters.length === 0)) {
          setCharacters(newData);
        } else {
          setCharacters((prevCharacters) => {
            const filteredData = newData.filter(
              (newCharacter: { id: number }) =>
                !prevCharacters.some(
                  (prevCharacter) => prevCharacter.id === newCharacter.id
                )
            );
            return [...prevCharacters, ...filteredData];
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

  useEffect(() => {
    fetchData();
  }, []);

  const onNewSearchValue = (newValue: string) => {
    setSearchValue(newValue);
    fetchData(newValue, true);
  };

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      fetchData(searchValue, false, qtd);
    }
  };

  const t = 12;
  const threshold = (qtd - t) / qtd;

  return (
    <div>
      <Header />
      <Container>
        <GlobalStyle />
        <SideBar onSearchClick={onNewSearchValue} />
        <InfiniteScroll
          dataLength={characters.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<h2>Fim dos personagens</h2>}
          scrollThreshold={threshold}
        >
          <CardList>
            {characters.map((character) => {
              return (
                <Card
                  key={character.id}
                  thumbnail={character.thumbnail}
                  onClick={() => navigate(`/characters/${character.id}`)}
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
