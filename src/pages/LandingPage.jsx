import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png"
import NavBar from '@src/layouts/NavBar'
import Title from '@src/components/landing-page/Title'
import Footer from '@src/layouts/Footer'
import OrderProcess from '@src/components/landing-page/OrderProcess'

const LandingPage = () => {
  return (
    <div 
      className="bg-cover bg-center bg-black h-full flex flex-col items-center navbar-spacing w-full " 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='max-w-[1200px]'>
        <Title />
        <OrderProcess />
        
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage