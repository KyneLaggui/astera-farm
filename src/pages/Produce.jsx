import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png"
import Product from '@src/components/produce-page/Product'

const Produce = () => {
  return (
    <div className="bg-cover bg-center bg-black h-full flex flex-col items-center navbar-spacing w-full " 
      style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className="font-gothic text-9xl text-white text-center tracking-wide">OUR PRODUCE</h1>
          <p className='font-spartan font-semibold text-white tracking-widest text-center'>PESTICIDE FREE, FUNGICIDE FREE, HYDROPONICALLY GROWN</p>
        </div>

        <Product />
    </div>
  )
}

export default Produce