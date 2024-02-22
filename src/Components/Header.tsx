import { Link, useLocation } from "react-router-dom";
import { Headers } from "../styles/HeaderStyle";
import ToggleButton from "./ToggleButton";

export default function Header() {
  const location = useLocation();

  return (
    <div>
      
      <Headers>
      <h1>PlooMics</h1>
        {location.pathname !== "/home" && (
          <Link to={"/home"} className="link-style">
            <h2>Home</h2>
          </Link>
        )}

        {location.pathname !== "/characters" && (
          <Link to={"/characters"} className="link-style">
            <h2>Characters</h2>
          </Link>
        )}

        {location.pathname !== "/comics" && (
          <Link to={"/comics"} className="link-style">
            <h2>Comics</h2>
          </Link>
        )}

        {location.pathname !== "/creators" && (
          <Link to={"/creators"} className="link-style">
            <h2>Creators</h2>
          </Link>
        )}

        {location.pathname !== "/logout" && (
          <Link to={"/logout"} className="link-style">
            <h2>Log Out</h2>
          </Link>
        )}
        <ToggleButton />
      </Headers>
    </div>
  );
}
