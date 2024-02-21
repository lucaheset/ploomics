import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Headers } from "../styles/HeaderStyle";

export default function Header() {
  const location = useLocation();

  return (
    <div>
      <Headers>
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
          <Link to={"/logout"} className="link-style-logout">
            <h2>Log Out</h2>
          </Link>
        )}
      </Headers>
    </div>
  );
}
