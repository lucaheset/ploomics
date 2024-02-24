import { useState } from "react";
import { SideBarButton, Sidebar, SidebarInput } from "../styles/SidebarStyle";
import {Filters} from "./Filters";
import { useLocation } from "react-router-dom";

interface SideBarProps {
  onSearchClick: (value: string) => void;
  setComics?: any
  onComicsFetched?: any
}

const SideBar = ({ onComicsFetched ,setComics,  onSearchClick }: SideBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const {pathname} = useLocation()

  return (
    <div>
      <Sidebar>
        <h1>PLOO<span>MICS</span></h1>
        <SidebarInput
          placeholder="Pesquise pelo nome..."
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <SideBarButton onClick={() => onSearchClick(searchValue)}>
          Pesquisar
        </SideBarButton>
        {pathname === "/comics" && (
        <Filters onSearchClick={onSearchClick} setComics={setComics} onComicsFetched={onComicsFetched}/>

        )}
      </Sidebar>
    </div>
  );
};

export default SideBar;
