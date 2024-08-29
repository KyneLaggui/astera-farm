import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png"
import NavBar from '@src/layouts/NavBar'
import Title from '@src/components/landing-page/Title'
import Footer from '@src/layouts/Footer'
import OrderProcess from '@src/components/landing-page/OrderProcess'

const LandingPage = () => {
  return (
    <div 
      className="bg-cover bg-center h-screen flex flex-col items-center justify-start navbar-spacing w-full" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <Title />
        <OrderProcess />
        <Footer />
    </div>
  )
}

export default LandingPage