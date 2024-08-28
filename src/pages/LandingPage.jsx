import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png"
import NavBar from '@src/layouts/NavBar'
import Title from '@src/components/landing-page/Title'

const LandingPage = () => {
  return (
    <div 
      className="bg-cover bg-center h-screen flex flex-col items-center justify-start " 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <Title />
        
    </div>
  )
}

export default LandingPage