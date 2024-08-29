import { CircleChevronRight } from 'lucide-react'
import React from 'react'
import Background from '@src/assets/images/BG-Title.png'
import Seasonings from '@src/assets/images/Seasonings.png'

const Title = () => {
  return (
    <div
      className='mt-4 bg-cover bg-center py-5 px-5 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-start relative rounded-[55px]'
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Mobile Version */}
      <div className='lg:hidden w-full flex flex-col gap-3 max-w-[800px]'>
        {/* Title */}
        <div className='font-galindo text-green text-stroke flex items-start flex-col'>
          <h1 className='text-[24px] sm:text-[40px]'>TRY OUR NEW</h1>
          <h1 className='text-[40px] sm:text-[60px] mt-[-10px] sm:mt-[-30px]'>
            SEASONING!
          </h1>
        </div>

        <p className='font-galindo text-base sm:text-lg'>
          Inspired by one of the largest stars in the universe, "Betelgeuse," our fusion blend surely packs big in flavor while maintaining a low sodium and MSG-FREE mixture.
        </p>

        <div className='flex items-center py-2 sm:py-3 px-4 sm:px-5 justify-center text-yellow gap-2 sm:gap-3 rounded-full bg-green-800 w-max font-spartan font-bold text-2xl'>
          <button className='mt-1'>Shop Now</button>
          <CircleChevronRight size={30} />
        </div>

        {/* Picture of Seasoning */}
        <img
          src={Seasonings}
          alt='Seasoning'
          className='w-[250px] sm:w-[350px] mt-5 object-contain block'
        />
      </div>

      {/* Large Screen Version */}
      <div className='hidden lg:flex w-full flex-row gap-5 max-w-full items-center lg:px-8 xl:px-12'>
        {/* Left Contents */}
        <div className='w-full flex flex-col gap-5 max-w-[600px] xl:max-w-[700px]'>
          {/* Title */}
          <div className='font-galindo text-green text-stroke flex items-start flex-col'>
            <h1 className='text-[60px] xl:text-[80px]'>TRY OUR NEW</h1>
            <h1 className='text-[80px] xl:text-[100px] mt-[-40px] xl:mt-[-60px]'>
              SEASONING!
            </h1>
          </div>

          <p className='font-galindo text-lg xl:text-xl'>
            Inspired by one of the largest stars in the universe, "Betelgeuse," our fusion blend surely packs big in flavor while maintaining a low sodium and MSG-FREE mixture.
          </p>

          <div className='flex items-center py-3 px-5 justify-center text-yellow gap-3 rounded-full bg-green-800 w-max font-spartan font-bold text-2xl xl:text-3xl'>
            <button className='mt-1'>Shop Now</button>
            <CircleChevronRight size={35} />
          </div>
        </div>

        {/* Picture of Seasoning */}
        <img
          src={Seasonings}
          alt='Seasoning'
          className='w-[300px] md:w-[400px] xl:w-[500px] object-contain block'
        />
      </div>
    </div>
  )
}

export default Title
