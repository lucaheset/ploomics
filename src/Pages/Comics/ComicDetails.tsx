import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { BASE_URL_COMICS, ts, hashCookies } from "../../Constants";
import Cookies from "js-cookie";
import { CardList, Container, DetailedCard } from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import Header from "../../Components/Header";

// Definição da interface Character
interface Character {
  resourceURI: string;
  name: string;
  // Add other character properties as needed
}

interface Comics {
  title: string;
  // Define `characters` as an object with an `items` array
  characters: {
    available: number;
    resourceURI: string;
    items: Character[]; // Assuming `items` is an array of `Character` objects
    returned: number;
  };
  thumbnail: {
    path: string;
    extension: string;
  };
}
const ComicDetail = () => {
  const { comicId } = useParams(); // Pega o comicId da URL
  const navigate = useNavigate();
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
        console.log(error);
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
          <p>Loading...</p>
        ) : comicDetail ? (
          <CardList>
            <DetailedCard thumbnail={comicDetail.thumbnail}>
              <div id="img" /> {/* Esta div mostrará a imagem de fundo */}
              <h2>{comicDetail.title}</h2>
              {/* Garanta que a descrição seja renderizada aqui embaixo */}
              <p>
                Characters
                {comicDetail.characters.items.length > 0
                  ? comicDetail.characters.items.map((characters, index) => {
                      // Aqui você extrai o ID da comic do resourceURI
                      const characterId = characters.resourceURI.split("/").pop();
                      console.log(characters)
                      return (
                        <span key={index}>
                          {/* Use o comicId para criar o Link */}
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
