import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import SetAPI from "./Components/SetAPI";
import Home from "./Pages/Home";
import GlobalStyle from "./styles/global";

export default function App() {
  const [data, setData] = useState([]);

  

  const publicKey = "abc67a9caabe195f8ce35b9c7dd2cce8";
  const privateKey = "24985a9e37dcb6b9b13060c74f408f21584697b4";




  return (
    <div>
      <GlobalStyle/>
      <Home />
      <SetAPI />
      
    </div>
  );
}
