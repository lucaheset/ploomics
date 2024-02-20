import React, { useEffect, useState } from 'react'
import GlobalStyle from '../styles/global'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { BASE_URL_CHARACTERS } from '../Constants'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'
import { useAuth } from '../Storage/useAuth'
import { useLoading } from '../Storage/useLoading'
import Loading from '../Components/Loading'



// const ts = Number(new Date());

// const hash = md5(ts + privateApi + publicApi);

// const hashCookies = md5(
//   ts +
//     (Cookies.get("UserPrivateApi") ?? "") +
//     (Cookies.get("UserPublicApi") ?? "")
// );

export default function Home() {

  
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const navigate = useNavigate()

  const setIsLoading = useLoading((state) => state.setIsLoading)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])

  
  return (

    <div>
      <Loading />
      <GlobalStyle />
        <div className='header'>
            <li>
              <Link to={"/Characters"}>Characters</Link>
            </li>
            <li>
              <Link to={"/Comics"}>Comics</Link>
            </li>
            <li>
              <Link to={"/Creators"}>Creators</Link>
            </li>
            <li>
              <Link to={"/Logout"}>Log Out</Link>
            </li>
        </div>
    </div>

  )
}

