import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from '@src/redux/slice/cartSlice';
import { selectEmail } from '@src/redux/slice/authSlice';
import { selectShippingAddress } from '@src/redux/slice/checkoutSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPayMongo = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const navigate = useNavigate();

  const shippingAddress = useSelector(selectShippingAddress);

  const description = `eShop payment: Email: ${customerEmail}, Amount: ${totalAmount}`;

  // const dev = process.env.NODE_ENV !== 'production';
  // const server = dev ? 'http://localhost:4242/create-payment-intent-paymongo' : 'https://ecommerce-shop-api.onrender.com/create-payment-intent-paymongo';
  
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  useEffect(() => {    
    const getUrl = async () => {
      if (cartItems && shippingAddress && description) {
        const filteredItems = cartItems.map((item) => {
          return {
            currency: 'PHP',
            amount: item.price * 100, // Convert price to cents (or smallest currency unit)
            name: item.name,
            quantity: item.cartQuantity,        
          }
        });

        const metaDataItems = cartItems.map((item) => {
          return {
            currency: 'PHP',
            amount: item.price,
            name: item.name,
            quantity: item.cartQuantity,        
          }
        });

        try {
          const checkoutSession = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'authorization': 'Basic c2tfdGVzdF84ZmRZaFhnOVhjM05kcHhmZVpxVmNKZng6', 
            },
            body: JSON.stringify({
              data: {
                attributes: {
                  type: "payment.paid",
                  send_email_receipt: false,
                  show_description: true,
                  show_line_items: true,
                  description: "This is the payment for Astera",
                  line_items: filteredItems,
                  payment_method_types: ["billease", "gcash", "card", "dob", "dob_ubp", "grab_pay", "paymaya"],
                  cancel_url: "http://localhost:5173/",
                  success_url: "http://localhost:5173/checkout-success",
                  livemode: true,
                  metadata: {
                    cart: JSON.stringify(metaDataItems),
                  }
                },
              },
            }),
          });           
  
          const checkoutSessionJSON = await checkoutSession.json();                  
          console.log(checkoutSessionJSON);

          // window.location.href = checkoutSessionJSON.data.attributes.checkout_url
          
        } catch (error) {
          console.error("Error creating payment intent:", error);
          navigate('/')
        }
      }      
    }

    getUrl();
  }, [cartItems, customerEmail, shippingAddress, description])
  return (
    <div>CheckoutPaymongo</div>
  )
}

export default CheckoutPayMongo