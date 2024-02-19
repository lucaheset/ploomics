import React from 'react'
import GlobalStyle from '../styles/global'
import { Toaster, toast } from 'sonner'

const Home = () => {

  toast.success("Autenticado com sucesso.")
  return (

    <div>
      <Toaster position="top-center" richColors closeButton/>
      <GlobalStyle />
        <div className='header'>
            
        </div>
    </div>

  )
}

export default Home