
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@src/components/ui/card';
import { CircleMinus, Minus, Plus } from 'lucide-react';
import { Input } from '@src/components/ui/input';
import { REMOVE_FROM_CART, SET_CART, selectCartItems } from '@src/redux/slice/cartSlice';
import { selectEmail } from '@src/redux/slice/authSlice';
import { addToCart, decreaseCart, removeFromCart } from '@src/supabase/actions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@src/components/ui/tooltip";


const CartProducts = ({ image, title, amount, initialQuantity, productId }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false); // Track loading for both increment and decrement
  const [emailState, setEmailState] = useState('');
  const [cartItemsState, setCartItemsState] = useState([]);
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = async () => {
    if (loading) return; // Prevent another click while loading
    setLoading(true); // Lock all actions

    const result = await addToCart(cartItemsState, { id: productId, name: title, price: amount, cartQuantity: 1 }, email);
    if (result) {
      dispatch(SET_CART(result.cartItems)); // Update Redux store with the updated cart
      setQuantity(prevQuantity => prevQuantity + 1); // Update local state
    }

    setLoading(false); // Unlock after operation
  };
  
  const handleDecrement = async () => {
    if (quantity > 1 && !loading) { // Prevent action if loading
      setLoading(true); // Lock all actions

      const result = await decreaseCart(cartItemsState, { id: productId, name: title, price: amount, cartQuantity: 1 }, email);
      if (result) {
        dispatch(SET_CART(result.cartItems)); // Update Redux store
        setQuantity(prevQuantity => prevQuantity - 1); // Update local state
      }
      
      setLoading(false); // Unlock after operation
    }
  };
  
  const handleRemove = async() => {
    if (loading) return; // Prevent another click while loading
    setLoading(true); // Lock all actions

    const result = await removeFromCart(cartItemsState, productId, email)

    if (result) {
      dispatch(SET_CART(result.cartItems)); // Update Redux store with the updated cart
    }

    setLoading(false); // Unlock after operation
  };

  const handleInputChange = (e) => {
    let newQuantity = e.target.value;
    setQuantity(newQuantity);
  };

  const handleInputBlur = () => {
    let newQuantity = parseInt(quantity, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    dispatch(
      ADD_TO_CART({
        id: productId,
        name: title,
        price: amount,
        cartQuantity: newQuantity - initialQuantity,
      })
    );
  };
  
 useEffect(() => {
    setEmailState(email);
  }, [email]);

  useEffect(() => {
    setCartItemsState(cartItems);
  }, [cartItems]);


  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex justify-between gap-2">
          <div className="flex items-center md:max-w-[240px] w-full d:gap-2 gap-4 max-w-[500px]">
            <div className="w-[120px] h-[120px] flex-shrink-0">
              <img
                src={image}
                alt="vegetable-pic"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col sm:gap-7 md:gap-2 gap-2 w-full md:max-w[150px] md:min-w-[150px]">
              <h1 className="text-xl font-semibold max-h-[3.6em] overflow-hidden text-ellipsis line-clamp text-container">
                {title}
              </h1>

              <div className='flex flex-col sm:flex-row sm:gap-7 md:flex-col md:gap-4 gap-4 items-start sm:items-center md:items-start'>
                <p className='text-md text-yellow'>₱{Number(amount) * Number(quantity)}</p>
                <div className='flex justify-between items-center border max-h-[40px] max-w-[200px] rounded-full px-2 py-1 w-full'>
                  <Plus 
                    size={16} 
                    onClick={handleIncrement} 
                    className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={loading} // Disable while loading
                  />
                  <Input 
                    type="number" 
                    value={quantity} 
                    readOnly 
                    className="w-9 h-7 p-0 pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Minus 
                    size={16} 
                    onClick={handleDecrement} 
                    className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={loading} // Disable while loading
                  />
                </div>
                {quantity >= 30 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild className="cursor-pointer">
                        <h1 className="text-yellow font-spartan">
                          Ordering as Bulk?
                        </h1>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[200px]" side="bottom">
                        <p>
                          Orders of{" "}
                          <span className="text-yellow">30+ items</span> are
                          considered <span className="text-yellow">bulk</span>{" "}
                          and will require{" "}
                          <span className="text-yellow">
                            extra processing time
                          </span>
                          . We’ll ensure everything is prepared and packed with
                          care!
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>


          <CircleMinus 
            onClick={handleRemove} 
            className={`h-4 w-4 cursor-pointer text-red-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={loading} // Disable while loading
          />
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
  productId: PropTypes.number.isRequired,
};

export default CartProducts;
