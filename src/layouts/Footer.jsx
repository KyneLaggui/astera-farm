import React from 'react'
import Logo from '@src/assets/images/main-logo-green.png'
import Facebook from '@src/assets/images/Facebook.png'
import Instagram from '@src/assets/images/Instagram.png'
import { CircleChevronRight } from 'lucide-react'



const Footer = () => {
  return (
    <div className='w-full bg-[#ffe500] bottom-0 flex justify-around py-5 rounded-t-3xl mt-4'>
        
        {/* Left Side */}
        <div className='flex justify-between flex-col'>
            <img src={Logo} alt='Logo' className='w-[200px] object-contain'/>
            <div className='flex items-center gap-2'>
                <img src={Facebook} alt='Logo' className='w-[35px] object-contain'/>
                <img src={Instagram} alt='Logo' className='w-[35px] object-contain'/>
            </div>
        </div>

        {/* Right Side */}
        <div className='flex justify-between flex-col min-h-[150px]'>
            <div className='font-spartan text-green'>
                <h1 className='font-extrabold text-3xl'>Subscribe to our news letter!</h1>
                <p className='font-semibold text-xl'>Stay updated for upcoming discounts, releases and more!</p>
            </div>
            <div className='flex'>
                <input type='text' placeholder='example@email.com' className='w-full px-3 rounded-l-full border-none' />
                <div className='flex bg-green text-yellow gap-2 py-1 px-2 items-center rounded-r-full'>
                    <h1 className='text-2xl font-spartan font-extrabold mt-1'>Subscribe</h1>
                    <CircleChevronRight size={30} />
                </div>
            </div>
            <p className='font-spartan text-green leading-none'>@2023, Astera Farms™. All Rights Reserved Privacy Policy. Supplier Code of Conduct.</p>
        </div>
    </div>
  )
}

export default Footer