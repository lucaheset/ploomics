import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { ts, hashCookies, BASE_URL_CHARACTERS } from "../../Constants";
import Cookies from "js-cookie";
import { CardList, Container, DetailedCard } from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";

interface Character {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterDetail = () => {
  const { characterId } = useParams();

  const [characterDetail, setCharacterDetail] = useState<Character | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL_CHARACTERS}/${characterId}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const characterData: Character = response.data.data.results[0];
        setCharacterDetail(characterData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.warning(
          "Certifique-se de estar autenticado para acessar essa página"
        );
        setLoading(false);
      });
  }, [characterId]);

  if (loading) {
    return <Loading />;
  }

  if (!characterDetail) {
    return <div>Personagem não encontrado.</div>;
  }

 

  return (
    <div>
      <Header />
      <Container>
        <CardList>
          <DetailedCard thumbnail={characterDetail.thumbnail}>
            <div id="img" /> =
            <h2>{characterDetail.name}</h2>
            <p>{characterDetail.description || "No description available."}</p>
          </DetailedCard>
        </CardList>
      </Container>
      <Toaster richColors position="bottom-right" closeButton />
      <GlobalStyle />
    </div>
  );
};

export default CharacterDetail;
