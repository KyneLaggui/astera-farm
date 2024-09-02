import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@src/components/ui/card';
import { CircleMinus, Minus, Plus } from 'lucide-react';
import { Input } from '@src/components/ui/input';

const CartProducts = ({ image, title, amount, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
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
        <div className='flex justify-between gap-2'>

            <div className='flex items-center md:max-w-[240px] w-full d:gap-2 gap-4 max-w-[500px]'>
                <div className='w-[120px] h-[120px] flex-shrink-0'>
                    <img src={image} alt='vegetable-pic' className='w-full h-full object-cover'/>
                </div>
                <div className='flex flex-col sm:gap-7 md:gap-2 gap-2 w-full md:max-w[150px] md:min-w-[150px]'>
                    <h1 className='text-xl font-semibold max-h-[3.6em] overflow-hidden text-ellipsis line-clamp text-container'>
                        {title}
                    </h1>
                    <div className='flex flex-col sm:flex-row sm:gap-7 md:flex-col md:gap-4 gap-4 items-start sm:items-center md:items-start'>
                      <p className='text-md text-yellow'>₱{Number(amount) * Number(quantity)}</p>
                      <div className='flex justify-between items-center border max-h-[40px] max-w-[200px] rounded-full px-2 py-1 w-full'>
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