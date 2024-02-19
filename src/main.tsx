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
}

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={router} />

  
)
