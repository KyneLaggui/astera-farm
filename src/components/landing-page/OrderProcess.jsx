import React from 'react'
import OrderProcessImg from '@src/assets/images/OrderProcess.png'
import Processes from './Processes'

const OrderProcess = () => {
  return (
    <div className='w-full flex flex-col gap-6'>
        <div className='flex justify-between gap-4 items-center px-4 flex-col md:flex-row' >
          <img src={OrderProcessImg} alt='Order Title' className='w-full max-w-[600px] min-w-[300px]' />
          <p className='font-spartan font-medium md:max-w-[300px] min-w-[300px] md:text-xl sm:text-lg text-base md:text-end text-center text-yellow'>A streamlined system created by our developers for maximum taste and freshness.</p>
        </div>
        
        <Processes />
    </div>
  )
}

export default OrderProcess