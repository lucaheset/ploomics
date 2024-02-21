import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { BASE_URL_COMICS, ts, hashCookies } from "../../Constants";
import Cookies from "js-cookie";
import { Container } from "../../styles/styles";
import GlobalStyle from "../../styles/global";
import Header from "../../Components/Header";

const ComicDetail = () => {
  const { comicId } = useParams(); // Pega o comicId da URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL_COMICS}/${comicId}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const comicDetails = response.data.data.results[0]; // Supondo que a API retorna um array com um único objeto de detalhes

  
        setLoading(false);
        console.log(comicDetails);
      })
      .catch((error) => {
        console.log(error);
        toast.warning(
          "Certifique-se de estar autenticado para acessar essa página"
        );
        setLoading(false);
      });
  }, [comicId]); // Dependência para refazer a chamada se o comicId mudar

 

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

export default ComicDetail;
