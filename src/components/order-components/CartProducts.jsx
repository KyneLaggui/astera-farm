import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@src/components/ui/card';
import { CircleMinus, Minus, Plus } from 'lucide-react';
import { Input } from '@src/components/ui/input';

const CartProducts = ({ image, title, amount, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    console.log('Initial Quantity:', initialQuantity);
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <Card>  
      <CardContent className="p-3">
        <div className='flex justify-between'>

            <div className='flex items-center max-w-[240px] gap-2'>
                <div className='w-[120px] h-[120px] flex-shrink-0'>
                    <img src={image} alt='vegetable-pic' className='w-full h-full object-cover'/>
                </div>
                <div className='flex flex-col justify-start gap-4 max-w[150px] min-w-[150px]'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold max-h-[3.6em] overflow-hidden text-ellipsis line-clamp text-container'>
                        {title}
                        </h1>
                        <p className='text-md text-yellow'>₱{Number(amount) * Number(quantity)}</p>
                    </div>
                    <div className='flex justify-between items-center border rounded-full px-2 py-1 w-full'>
                        <Plus size={16} onClick={handleIncrement} className='cursor-pointer' />
                        <Input 
                        type="number" 
                        value={quantity} 
                        readOnly 
                        className="w-9 h-7 p-0 pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Minus size={16} onClick={handleDecrement} className='cursor-pointer' />
                    </div>
                </div>
            </div>

            <CircleMinus className='h-5 w-5 cursor-pointer'/>
            </div>

      </CardContent>
    </Card>
  );
};

CartProducts.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  initialQuantity: PropTypes.number.isRequired,
};

export default CartProducts;