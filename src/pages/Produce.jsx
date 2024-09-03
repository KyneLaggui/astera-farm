import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png"
import Product from '@src/components/produce-page/Product'
import { CircleChevronRight } from 'lucide-react'

const Produce = () => {
  return (
    <div className="bg-cover bg-center bg-black h-full flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center navbar-spacing w-full " 
      style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">OUR PRODUCE</h1>
          <p className='font-spartan font-semibold text-white tracking-widest text-center'>PESTICIDE FREE, FUNGICIDE FREE, HYDROPONICALLY GROWN</p>
        </div>

        <Product />

        <div className='flex flex-col items-center gap-4'>
          <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">ORDERING IN A BULK?</h1>
          <div className='flex items-center py-2 sm:py-3 lg:py-3 px-4 sm:px-5 lg:px-5 justify-center text-green gap-2 sm:gap-3 lg:gap-3 rounded-full bg-yellow w-max font-spartan font-bold text-xl md:text-2xl xl:text-3xl hover:text-yellow hover:bg-green cursor-pointer'>
            <button className='mt-1'>Click Here</button>
            <CircleChevronRight size={25} className='md:hidden' />
            <CircleChevronRight size={30} className='hidden md:block lg:hidden' />
            <CircleChevronRight size={35} className='hidden lg:block' />
          </div>
        </div>
    

    </div>
  )
}

export default Produce