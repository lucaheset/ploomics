import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import SetAPI from './Components/SetAPI.tsx';
import GlobalStyle from './styles/global.ts';
import Home from './Pages/Home.tsx';
import Logout from './Pages/Logout.tsx';
import Characters from './Pages/Characters/Characters.tsx';
import Comics from './Pages/Comics/Comics.tsx';
import Creators from './Pages/Creators/Creators.tsx';
import ComicDetail from './Pages/Comics/ComicDetails.tsx';
import CharacterDetail from './Pages/Characters/CharacterDetails.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SetAPI />
  },
{
  path: "/Home",
  element: <Home />
},
{
  path: "/Logout",
  element: <Logout />
},
{
  path: "/Characters",
  element: <Characters />
},
{
  path: "/Comics",
  element: <Comics />
},
{
  path: "/Creators",
  element: <Creators />
},
{
  path: "/Character/:characterId",
  element: <CharacterDetail />
},
{
  path: "/Comics/:comicId",
  element: <ComicDetail />,
},
{
  path: "/Creators/:creatorId",
  element: <ComicDetail />,
},





]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={router} />

  
)
