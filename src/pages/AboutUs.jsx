import React from 'react'
import backgroundImage from "@src/assets/images/background-image.png";
import AsteraMeaning from '@src/assets/images/astera-meaning.png'
import Moon1 from '@src/assets/images/about-us-pic-1.png'
import Moon2 from '@src/assets/images/about-us-pic-2.png'

const AboutUs = () => {
  return (
    <div className="bg-cover bg-center min-h-screen h-full flex flex-col gap-7 items-center navbar-spacing w-full"
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='max-w-[1200px] w-full flex flex-col gap-4 md:gap-8 lg:gap-12'>
        <div className='flex justify-between gap-4 items-start px-4 flex-col md:flex-row border-b-4 pb-4 border-white' >
           <h1 className="font-gothic text-8xl sm:text-9xl text-white text-start tracking-wide">ABOUT US</h1>
            <p className='font-spartan md:max-w-[300px] sm:min-w-[300px] text-2xl md:text-end text-start sm:text-center text-white mt-1'>
              Did you ever wonder where we got our name from?
            </p>
        </div>

        <div className='flex flex-col gap-4 font-lato text-yellow-50 p-4'>
          <img src={AsteraMeaning} alt='Astera picture meaning' className='max-w-[300px] w-full' />
          <p className='font-medium italic text-4xl sm:text-5xl lg:text-6xl'>meaning</p>
          <h1 className='font-black text-4xl sm:text-5xl lg:text-6xl'>Astera or <span className='text-yellow italic'>Asteras</span> in greek means <span className='text-yellow'>Star</span>.</h1>
          <span>
            <p className='text-2xl sm:text-3xl lg:text-4xl tracking-wide leading-normal font-normal lg:ml-8'>We decided to name our farm "Astera Farms" because we believe that <span className='italic'>hydroponics</span> and <span className='italic'>vertical farming</span> is the future of farming here on earth for more of a <span className='italic'>sustainable</span> and <span className='italic'>efficient</span> way of providing food for our growing population.</p>
          </span>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col md:flex-row gap-8 items-start sm:items-center md:items-start p-4'>
            <img src={Moon1} alt='About Us Pic' className='w-full md:max-w-[350px] lg:max-w-[450px]' />

            <div className='flex flex-col justify-between items-start sm:gap-6 lg:gap-7 xl:gap-8 gap-4'>
              <h1 className='font-gothic text-5xl sm:text-6xl lg:text-7xl'>MARTIAN MINI FARM CONCEPT</h1>
              <p className='font-spartan text-yellow text-xl sm:text-2xl md:text-xl lg:text-3xl'>We decided to have fun and asked ourselves this question: "What would be the kind of farms in Mars when we start colonizing it?" </p>
              <button className='bg-yellow text-green font-spartan font-semibold text-xl sm:text-2xl lg:text-3xl px-4 sm:px-6 pb-1 pt-2 rounded-full hover:bg-green hover:text-yellow max-w-fit'>Learn More</button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-8 items-start sm:items-center md:items-start  p-4'>
            <img src={Moon2} alt='About Us Pic' className='w-full md:max-w-[350px] lg:max-w-[450px]' />
            <div className='flex flex-col justify-between items-start sm:gap-6 lg:gap-7 xl:gap-8 gap-4'>
              <h1 className='font-gothic text-5xl sm:text-6xl lg:text-7xl'>LUNAR MINI FARM CONCEPT</h1>
              <p className='font-spartan text-yellow text-xl sm:text-2xl lg:text-3xl'>You can't go to Mars without having a stop first on the Moon right? </p>
              <button className='bg-yellow text-green font-spartan font-semibold text-xl sm:text-2xl lg:text-3xl px-4 sm:px-6 pb-1 pt-2 rounded-full hover:bg-green hover:text-yellow max-w-fit'>Learn More</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AboutUs