import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from '@src/redux/slice/cartSlice';
import { selectEmail } from '@src/redux/slice/authSlice';
import { selectShippingAddress } from '@src/redux/slice/checkoutSlice';

const CheckoutPayMongo = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);

  const description = `eShop payment: Email: ${customerEmail}, Amount: ${totalAmount}`;

  // const dev = process.env.NODE_ENV !== 'production';
  // const server = dev ? 'http://localhost:4242/create-payment-intent-paymongo' : 'https://ecommerce-shop-api.onrender.com/create-payment-intent-paymongo';

  const server = 'https://ecommerce-shop-api.onrender.com/create-payment-intent-paymongo'

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  useEffect(() => {
    const getUrl = async () => {
      const response = await fetch(
        server, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            items: cartItems,
            userEmail: customerEmail,
            shipping: shippingAddress,
            description
          })
        }
      )
      const data = await response.json();
      console.log(data)
      window.location.href = data.redirect_url
    }

    getUrl();
  }, [cartItems, customerEmail, shippingAddress, description, server])
  return (
    <div>CheckoutPaymongo</div>
  )
}

export default CheckoutPayMongo