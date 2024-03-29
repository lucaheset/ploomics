import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, FormContainer, Input } from "../styles/ApiInputButtonStyles";
import axios  from "axios";
import { Toaster, toast } from "sonner";
import GlobalStyle from "../styles/global";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Storage/useAuth";
import { BASE_URL_CHARACTERS, CookiesName, hashCookies, ts } from "../Constants";
import { useLoading } from "../Storage/useLoading";
import Loading from "./Loading";


const SetAPI = () => {
  const [privateApi, setPrivateApi] = useState("");
  const [publicApi, setPublicApi] = useState("");
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const navigate = useNavigate();


  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);


  function fetchData() {
    axios
      .get(
        `${BASE_URL_CHARACTERS}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {

        console.error(error);
        toast.warning("Certifique-se de colocar suas credenciais.");
      });
  }

  const handleSubmit = () => {
    Cookies.set("UserPrivateApi", privateApi, { expires: 7 });
    Cookies.set("UserPublicApi", publicApi, { expires: 7 });

    fetchData();
  };

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
      <Toaster richColors position="bottom-right" closeButton />
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
      
    </div>
  );
};

export default SetAPI;
