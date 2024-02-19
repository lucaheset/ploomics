import React from "react";
import Cookies from "js-cookie";
import SetAPI from "../Components/SetAPI";
import { CookiesName } from "../Constants";
import { Navigate, useNavigate } from "react-router-dom";
import GlobalStyle from "../styles/global";

const Logout = () => {
  Cookies.remove(CookiesName.UserPrivateApi);
  Cookies.remove(CookiesName.UserPublicApi);

  return (
    <div>
      <GlobalStyle />
      <Navigate to={"/"} />
    </div>
  );
};

export default Logout;
