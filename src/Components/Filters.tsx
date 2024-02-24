import axios from "axios";
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Toaster, toast } from "sonner";
import {
  BASE_URL_CHARACTERS,
  BASE_URL_CREATORS,
  BASE_URL_COMICS,
  getAuthQueryString,
} from "../Constants";

import "react-datepicker/dist/react-datepicker.css";
import { Comic } from "../Constants/types";

import {
  FiltersButton,
  FiltersContainer,
  FiltersDatePicker,
  FiltersInput,
  FiltersSelect,
} from "../styles/FilterStyle";

interface FilterProps {
  onComicsFetched: (comics: Comic[], startYear?: number) => void;
  setComics: Dispatch<SetStateAction<Comic[]>>;
  onSearchClick: (value: string) => void;
}

interface Data {
  id: number;
  name: string;
  fullName: string;
}

export const Filters = ({ onComicsFetched, setComics, onSearchClick }: FilterProps) => {
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [inputFilter, setInputFilter] = useState("");
  const [selectType, setSelectType] = useState<string>("character");
  const [id, setId] = useState<number>();
  const [qtd, setQtd] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [startYear, setStartYear] = useState<number | null>(null);

  const fetchData = (search: string, offset: number = 0) => {
    let url = "";

    if (selectType === "character") {
      url = `${BASE_URL_CHARACTERS}?nameStartsWith=${search}&${getAuthQueryString()}&offset=${offset}`;
    } else if (selectType === "creator") {
      url = `${BASE_URL_CREATORS}?nameStartsWith=${search}&${getAuthQueryString()}&offset=${offset}`;
    }

    if (url) {
      axios
        .get(url)
        .then((response) => {
          const newData = response.data.data.results;
          setFilteredData(newData);
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
    }
  };

  useEffect(() => {
    if (inputFilter.trim()) {
      fetchData(inputFilter);
    }
  }, [inputFilter, selectType]);

  const fetchFilteredComics = (id: number, offset: number = 0) => {
    let url = "";
    if (selectType === "character") {
      url = `${BASE_URL_CHARACTERS}/${id}/comics?&${getAuthQueryString()}&offset=${offset}&limit=${100}`;
    } else if (selectType === "creator") {
      url = `${BASE_URL_CREATORS}/${id}/comics?&${getAuthQueryString()}&offset=${offset}&limit=${100}`;
    }
      axios.get(url);
      axios
        .get(url)
        .then((response) => {
          const newData: Comic[] = response.data.data.results.map(
            (comicData: any) => ({
              id: comicData.id,
              title: comicData.title,
              thumbnail: comicData.thumbnail,
              characters: comicData.characters,
            })
          );
          if(startYear){
            onComicsFetched(newData,  startYear);
          } else {
            onComicsFetched(newData)
          }
          setComics((prevComics) => {
            const filteredData = newData.filter(
              (newComic: { id: number }) =>
                !prevComics.some((prevComic) => prevComic.id === newComic.id)
            );
            return [...prevComics, ...filteredData];
          });

          setHasMore(newData.length > 0);

          setQtd((prevOffset) => prevOffset + 19);
        })
        .catch((error) => {
          console.error("Erro ao buscar comics:", error);
          toast.error("Falha ao buscar comics!");
        });
    
  };

  const fetchComicsByYear = (year: number) => {
    const url = `${BASE_URL_COMICS}?startYear=${year}&${getAuthQueryString()}`;
    axios
      .get(url)
      .then((response) => {
        const newData: Comic[] = response.data.data.results.map(
          (comicData: any) => ({
            id: comicData.id,
            title: comicData.title,
            thumbnail: comicData.thumbnail,
            characters: comicData.characters,
          })
        );

        if(startYear){
          onComicsFetched(newData,  startYear);
        } else {
          onComicsFetched(newData)
        }
        setComics(newData);
        setHasMore(newData.length > 0);
      })
      .catch((error) => {
        console.error("Erro ao buscar comics pelo ano:", error);
        toast.error("Falha ao buscar comics pelo ano!");
      });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== undefined) {
      fetchFilteredComics(id);
      onSearchClick(String(id))
      toast.success("Filtro Aplicado!");
    } else {
      console.log("ID não definido.");
    }
  };

  const handleYearSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startYear !== null) {
      fetchComicsByYear(startYear);
      toast.success("Comics filtrados pelo ano!");
    } else {
      console.log("Ano não selecionado.");
    }
  };

  return (
    <>
      <FiltersContainer>
        <Toaster richColors position="bottom-right" closeButton />
        <form onSubmit={handleSubmit}>
          <FiltersInput
            type="text"
            onChange={(e) => setInputFilter(e.target.value)}
          />
          <FiltersButton type="submit">Filtrar</FiltersButton>
        </form>
        <FiltersSelect
          onChange={(e) => {
            setSelectType(e.target.value);
            const selectedId = parseInt(e.target.value, 10);
            if (!isNaN(selectedId)) {
              setId(selectedId);
            }
          }}
        >
          <option value="character">Character</option>
          <option value="creator">Creator</option>
        </FiltersSelect>
        <FiltersSelect onChange={(e) => setId(parseInt(e.target.value))}>
          <option defaultValue={""}>Selecione uma Opção</option>
          {filteredData.map((data) => (
            <option key={data.id} value={data.id}>
              {selectType === "character" ? data.name : data.fullName}
            </option>
          ))}
        </FiltersSelect>
        <form onSubmit={handleYearSubmit}>
          <FiltersDatePicker
            selected={startYear ? new Date(startYear, 0) : null}
            onChange={(date: Date) => {
              setStartYear(date ? date.getFullYear() : null);
            }}
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Select a year"
            wrapperClassName="datePicker"
          />
          <FiltersButton type="submit">Filtrar por Ano</FiltersButton>
        </form>
      </FiltersContainer>
    </>
  );
};
