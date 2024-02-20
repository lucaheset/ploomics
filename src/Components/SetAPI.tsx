import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import { Button, FormContainer, Input } from "../styles/ApiInputButtonStyles";
import axios, { AxiosError } from "axios";
import md5 from "md5";
import { Toaster, toast } from "sonner";
import { Rotate } from "../styles/IsLoadingStyle";
import GlobalStyle from "../styles/global";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Storage/useAuth";
import { BASE_URL_CHARACTERS, CookiesName } from "../Constants";
import { useLoading } from "../Storage/useLoading";
import Loading from "./Loading";

const SetAPI = () => {
  const [privateApi, setPrivateApi] = useState("");
  const [publicApi, setPublicApi] = useState("");
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const navigate = useNavigate();

  const ts = Number(new Date());

  const hash = md5(ts + privateApi + publicApi);

  const hashCookies = md5(
    ts +
      (Cookies.get("UserPrivateApi") ?? "") +
      (Cookies.get("UserPublicApi") ?? "")
  );

  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);

  // Função para checar se já existem os cookies com as autenticações.

  function fetchData() {
    axios
      .get(
        `${BASE_URL_CHARACTERS}ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        console.log(response.data.data);
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate("/Home");
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
      });
  }

  const handleSubmit = () => {
    Cookies.set("UserPrivateApi", privateApi, { expires: 7 });
    Cookies.set("UserPublicApi", publicApi, { expires: 7 });

    fetchData();
  };
  console.log("entrou na pagina setapi shaodre")
  useEffect(() => {
    if (
      !isAuthenticated &&
      Cookies.get(CookiesName.UserPrivateApi) &&
      Cookies.get(CookiesName.UserPublicApi)
    ) {
      fetchData();
      
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <FormContainer>
        <Input
          placeholder="Your Public Key"
          value={publicApi}
          onChange={(e) => setPublicApi(e.target.value)}
        />
        <Input
          placeholder="Your Private Key"
          value={privateApi}
          onChange={(e) => setPrivateApi(e.target.value)}
        />
        <Button type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
      </FormContainer>
      <GlobalStyle />
      <Toaster richColors position="top-center" closeButton />
    </div>
  );
};

export default SetAPI;
