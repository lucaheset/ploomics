import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProviderWrapper } from "./Components/ThemeContext"; // Ajuste o caminho conforme necessário
import GlobalStyle from "./styles/global";
import Home from "./Pages/Home";
import Logout from "./Pages/Logout";
import Characters from "./Pages/Characters/Characters";
import Comics from "./Pages/Comics/Comics";
import Creators from "./Pages/Creators/Creators";
import ComicDetail from "./Pages/Comics/ComicDetails";
import CharacterDetail from "./Pages/Characters/CharacterDetails";
import CreatorDetails from "./Pages/Creators/CreatorDetails";
import SetAPI from "./Components/SetAPI";




const router = createBrowserRouter([
  {
    path: "/",
    element: <SetAPI />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/characters",
    element: <Characters />,
  },
  {
    path: "/comics",
    element: <Comics />,
  },
  {
    path: "/creators",
    element: <Creators />,
  },
  {
    path: "/characters/:characterId",
    element: <CharacterDetail />,
  },
  {
    path: "/comics/:comicId",
    element: <ComicDetail />,
  },
  {
    path: "/creators/:creatorId",
    element: <CreatorDetails />,
  },
]);
const rootElement = document.getElementById("root");

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  );
} else {
  console.error("Failed to find the root element");
}