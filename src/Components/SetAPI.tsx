import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import { Button, FormContainer, Input } from "../styles/ApiInputButtonStyles";
import axios, { AxiosError } from "axios";
import md5 from "md5";
import { Toaster, toast } from "sonner";
import { Rotate } from "../styles/IsLoadingStyle";
import GlobalStyle from "../styles/global";
import { useNavigate } from 'react-router-dom';


const SetAPI = () => {
  const [privateApi, setPrivateApi] = useState("");
  const [publicApi, setPublicApi] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "http://gateway.marvel.com/v1/public/characters?";

  const ts = Number(new Date());

  const hash = md5(ts + privateApi + publicApi);

  const hashCookies = md5(
    ts +
      (Cookies.get("UserPrivateApi") ?? "") +
      (Cookies.get("UserPublicApi") ?? "")
  );

  const [isLoading, setIsLoading] = useState(true);

  // Use Effect para checar se já existem os cookies com as autenticações.
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        console.log(response.data.data);
        toast.success("Autenticado com Sucesso");
        setIsLoading(false);
        navigate('/Home');
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Certifique-se de estar autenticado");
        setIsLoading(false);
      });
  }, [history]);

  if (isLoading) {
    return (
      <h1>
        <Rotate>🕷</Rotate>
      </h1>
    );
  }

  const handleSubmit = async () => {
    Cookies.set("UserPrivateApi", privateApi, { expires: 7 });
    Cookies.set("UserPublicApi", publicApi, { expires: 7 });

    try {
      const response = await axios.get(
        `${BASE_URL}ts=${ts}&apikey=${publicApi}&hash=${hash}`
      );
      console.log(response);
      navigate('/Home');
      toast.success('Autenticado com sucesso.')
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          toast.error("Verifique as credenciais informadas");
        }
      }
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Toaster richColors position="top-center" closeButton />
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
    </div>
  );
};

export default SetAPI;
