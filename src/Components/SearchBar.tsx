import React, { useState } from "react";
import { Input } from "../styles/ApiInputButtonStyles";

interface Props {
  onSearchClick: (value: string) => void;
}

const SearchBar = ({ onSearchClick }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <Input
        placeholder="Pesquise pelo nome..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <button onClick={() => onSearchClick(searchValue)}>Pesquisar</button>
    </div>
  );
};

export default SearchBar;
