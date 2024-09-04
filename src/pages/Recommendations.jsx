import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png";

const Recommendations = () => {
  return (
    <div className="bg-cover bg-center min-h-screen h-full flex flex-col gap-7 items-center navbar-spacing w-full"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">RECOMMENDATIONS</h1>
          <p className='font-spartan font-semibold text-white tracking-widest text-center'>STAY IN TOUCH WITH YOUR PRODUCE FROM THE MOMENT IT GETS PICKED AND DELIVERED TO YOUR DOORSTEP </p>
        </div>
    </div>
  )
}

export default Recommendations