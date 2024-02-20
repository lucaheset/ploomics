import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Headers } from "../styles/HeaderStyle";

export default function Header() {
  const location = useLocation();

  return (
    <div>
      <Headers>
        {location.pathname !== "/Home" && (
          <Link to={"/Home"} className="link-style">
            <h2>Home</h2>
          </Link>
        )}

        {location.pathname !== "/Characters" && (
          <Link to={"/Characters"} className="link-style">
            <h2>Characters</h2>
          </Link>
        )}

        {location.pathname !== "/Comics" && (
          <Link to={"/Comics"} className="link-style">
            <h2>Comics</h2>
          </Link>
        )}

        {location.pathname !== "/Creators" && (
          <Link to={"/Creators"} className="link-style">
            <h2>Creators</h2>
          </Link>
        )}

        {location.pathname !== "/Logout" && (
          <Link to={"/Logout"} className="link-style-logout">
            <h2>Log Out</h2>
          </Link>
        )}
      </Headers>
    </div>
  );
}
