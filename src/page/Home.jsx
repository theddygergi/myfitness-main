import React from 'react'

import Header from './global/Header'
import Footer from './global/Footer'

export default function Home() {
  const trueBool=true;
  return (
    <div className='home-page'>
      <Header ofPage="home" />
      <Footer/>
    </div>
  )
}
