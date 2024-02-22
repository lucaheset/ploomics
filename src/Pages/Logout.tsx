import Cookies from "js-cookie";
import { CookiesName } from "../Constants";
import { Navigate } from "react-router-dom";
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
