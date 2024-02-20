import React from 'react'
import { Link } from 'react-router-dom'
import GlobalStyle from '../styles/global'
import { useAuth } from '../Storage/useAuth'

const Comics = () => {

 

  return (
    <div>
    <GlobalStyle />
      <div className='header'>
          <li>
            <Link to={"/Home"}>Home</Link>
          </li>
          <li>
            <Link to={"/Characters"}>Characters</Link>
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

export default Comics