import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {ts, hashCookies, BASE_URL_CHARACTERS } from "../../Constants";
import Cookies from "js-cookie";
import { Container } from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import Header from "../../Components/Header";

const CharacterDetail = () => {
  const { characterId } = useParams(); // Pega o comicId da URL
  const navigate = useNavigate();
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
        const characterDetails = response.data.data.results[0]; // Supondo que a API retorna um array com um único objeto de detalhes

  
        setLoading(false);
        console.log(characterDetails);
      })
      .catch((error) => {
        console.log(error);
        toast.warning(
          "Certifique-se de estar autenticado para acessar essa página"
        );
        setLoading(false);
      });
  }, [characterId]); // Dependência para refazer a chamada se o characterId mudar

 

  return (
    <div>
        <Toaster richColors position="bottom-right" closeButton />
        <Header />
        <Container>
            <GlobalStyle />

        </Container>

      <h1></h1>
    </div>
  );
};

export default CharacterDetail;
