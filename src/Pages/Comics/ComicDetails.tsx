import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { BASE_URL_COMICS, ts, hashCookies } from "../../Constants";
import Cookies from "js-cookie";
import { CardList, Container, DetailedCard } from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";

interface Character {
  resourceURI: string;
  name: string;
}

interface Comics {
  title: string;
  characters: {
    available: number;
    resourceURI: string;
    items: Character[]; 
    returned: number;
  };
  thumbnail: {
    path: string;
    extension: string;
  };
}
const ComicDetail = () => {
  const { comicId } = useParams();
  const [loading, setLoading] = useState(false);
  const [comicDetail, setComicDetail] = useState<Comics | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL_COMICS}/${comicId}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const comicData: Comics = response.data.data.results[0];
        setComicDetail(comicData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.warning("Make sure you are authenticated to access this page");
        setLoading(false);
      });
  }, [comicId]);

  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Container>
        {loading ? (
          <Loading />
        ) : comicDetail ? (
          <CardList>
            <DetailedCard thumbnail={comicDetail.thumbnail}>
              <img
              src={`${comicDetail.thumbnail.path}.${comicDetail.thumbnail.extension}`}
              />
              <h2>{comicDetail.title}</h2>
              
              <p>
                Characters: 
                {comicDetail.characters.items.length > 0
                  ? comicDetail.characters.items.map((characters, index) => {
                      const characterId = characters.resourceURI.split("/").pop();
                      return (
                        <span key={index}>
                          <Link to={`/characters/${characterId}`}>
                            {characters.name}
                          </Link>
                          {index < comicDetail.characters.items.length - 1 ? ", " : ""}
                        </span>
                      );
                    })
                  : "No comics found."}
              </p>
            </DetailedCard>
          </CardList>
        ) : (
          <p>Comic details not available.</p>
        )}
      </Container>
      <GlobalStyle />
    </div>
  );
};

export default ComicDetail;
