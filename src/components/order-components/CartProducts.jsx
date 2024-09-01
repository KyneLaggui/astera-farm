import React from 'react'
import { Card, CardContent } from '@src/components/ui/card'
import { CircleMinus, Minus, Plus } from 'lucide-react'
import { Input } from '@src/components/ui/input'
import Vegetable1 from '@src/assets/images/Vegetable-1.png'

const CartProducts = () => {
  return (
    <Card>  
        <CardContent className="p-3">
            <div className='flex justify-center gap-2'>
            <div className='flex items-center'>
                <img src={Vegetable1} alt='vegetable-pic' className='w-[130px]'/>
                <div className='flex flex-col justify-start flex-end gap-4'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>SUPERNOVA BETELGEUSE</h1>
                        <p className='text-md text-yellow'>₱149.00</p>
                    </div>
                    
                    <div className='flex justify-evenly items-center border rounded-full px-2 py-1'>
                        <Plus size={16} />
                        <Input type="number" value="10" className="w-9 h-7 p-0 pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                        <Minus size={16}  />
                    </div>
                </div>
            </div>
            <CircleMinus  className='h-6 w-6' />
            </div>
        </CardContent>
    </Card>
  )
}

export default CartProducts