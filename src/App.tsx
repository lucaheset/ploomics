

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import ComicsFavorite from "./Pages/ComicsFavorite/ComicsFavorite";



// export default function App() {

// caso precise de uma apikey pra teste. Elas nao estao sendo implementadas.

//   const publicKey = "abc67a9caabe195f8ce35b9c7dd2cce8";
//   const privateKey = "24985a9e37dcb6b9b13060c74f408f21584697b4"


export const router = createBrowserRouter([
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
    path: "/comicsfavorite",
    element: <ComicsFavorite />,
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