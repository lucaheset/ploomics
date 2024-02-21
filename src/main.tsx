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
import CreatorDetails from './Pages/Creators/CreatorDetails.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SetAPI />
  },
{
  path: "/home",
  element: <Home />
},
{
  path: "/logout",
  element: <Logout />
},
{
  path: "/characters",
  element: <Characters />
},
{
  path: "/comics",
  element: <Comics />
},
{
  path: "/creators",
  element: <Creators />
},
{
  path: "/characters/:characterId",
  element: <CharacterDetail />
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={router} />

  
)
