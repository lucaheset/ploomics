import { useState } from "react";
import { SideBarButton, Sidebar, SidebarInput } from "../styles/SidebarStyle";

interface Props {
  onSearchClick: (value: string) => void;
}

const SideBar = ({ onSearchClick }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <Sidebar>
        <SidebarInput
          placeholder="Pesquise pelo nome..."
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <SideBarButton onClick={() => onSearchClick(searchValue)}>Pesquisar</SideBarButton>
      </Sidebar>
    </div>
  );
};

export default SideBar;
