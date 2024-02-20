import React, { useEffect, useState } from "react";
import GlobalStyle from "../styles/global";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { BASE_URL_CHARACTERS, CookiesName } from "../Constants";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import md5 from "md5";
import { useAuth } from "../Storage/useAuth";
import { useLoading } from "../Storage/useLoading";
import Loading from "../Components/Loading";
import Header from "../Components/Header";

// const ts = Number(new Date());

// const hash = md5(ts + privateApi + publicApi);

// const hashCookies = md5(
//   ts +
//     (Cookies.get("UserPrivateApi") ?? "") +
//     (Cookies.get("UserPublicApi") ?? "")
// );

export default function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const setIsLoading = useLoading((state) => state.setIsLoading);

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
