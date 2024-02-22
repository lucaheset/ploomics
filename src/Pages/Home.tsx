import { useEffect } from "react";
import GlobalStyle from "../styles/global";
import { Toaster, toast } from "sonner";
import { CookiesName } from "../Constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Storage/useAuth";

import Loading from "../Components/Loading";
import Header from "../Components/Header";


export default function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isAuthenticated == false &&
      !Cookies.get(CookiesName.UserPrivateApi) &&
      !Cookies.get(CookiesName.UserPublicApi)
    ) {
      navigate("/");
    }
    else{
      toast.success("Autenticado com sucesso.")
    }
  }, []);

  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Loading />
      <GlobalStyle />

    </div>
  );
}
