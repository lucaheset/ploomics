import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlobalStyle from '../styles/global'
import axios from 'axios'
import { toast } from 'sonner'
import { BASE_URL_CHARACTERS, hashCookies, ts } from '../Constants'
import Cookies from 'js-cookie'
import { useAuth } from '../Storage/useAuth'
import { useLoading } from '../Storage/useLoading'

const Characters = () => {

  const [characters, setCharacters] = useState<any[]>([])

  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  const setIsLoading = useLoading((state) => state.setIsLoading);
  const isLoading = useLoading((state) => state.isLoading);
  
  useEffect(() => {
    
      axios
      .get(
        `${BASE_URL_CHARACTERS}ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const data = (response.data.data.results)
        console.log(data);
        setCharacters(data)
        setIsLoading(false);
        
      })
      .catch((error) => {
        console.log(error);
      });
    
  }, []);

 
  
  
  return (
    <div>
    <GlobalStyle />
      <div>
          {characters.map((character) => (
            <div key={character.id}>
              {character.name} {character.description}
              </div>
          ))}
      </div>
  </div>
  )
}

export default Characters
