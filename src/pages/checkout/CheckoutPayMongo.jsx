import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount } from '@src/redux/slice/cartSlice';
import { selectEmail, selectUserID } from '@src/redux/slice/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPayMongo = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const userId = useSelector(selectUserID);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const navigate = useNavigate();

  const description = `Astera payment: Email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {    
    const getUrl = async () => {
      let filteredItems;
      let metaDataItems;
      const { bulkOrder, isBulkOrder } = location.state;

      if (cartItems && description) {
        if (isBulkOrder) {
          filteredItems = bulkOrder.map((item) => {
            return {
              currency: 'PHP',
              amount: (item.price * location.state.discountFactor) * 100, // Convert price to cents (or smallest currency unit)
              name: item.name,
              quantity: item.cartQuantity,        
            }
          });
          metaDataItems = bulkOrder.map((item) => {
            return {
              currency: 'PHP',
              amount: item.price * location.state.discountFactor,
              name: item.name,
              quantity: item.cartQuantity,        
            }
          });
        } else {
          filteredItems = cartItems.map((item) => {
            return {
              currency: 'PHP',
              amount: (item.price * location.state.discountFactor) * 100, // Convert price to cents (or smallest currency unit)
              name: item.name,
              quantity: item.cartQuantity,        
            }
          });
          metaDataItems = cartItems.map((item) => {
            return {
              currency: 'PHP',
              amount: item.price * location.state.discountFactor,
              name: item.name,
              quantity: item.cartQuantity,        
            }
          });
        }       
        
        try {
          const checkoutSession = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'authorization': 'Basic c2tfdGVzdF9iNTR6bVYxSFRjSlVXYkcxemZQeUo1Umk6', 
            },
            body: JSON.stringify({
              data: {
                attributes: {
                  type: "payment.paid",
                  send_email_receipt: false,
                  show_description: true,
                  show_line_items: true,
                  description: `This is the payment for Astera Farm${location.state.discountFactor !== 1 ? ` with a ${100 - (location.state.discountFactor * 100)}% discount.` : '.'}`,
                  line_items: filteredItems,
                  payment_method_types: ["billease", "gcash", "card", "grab_pay", "paymaya"],
                  cancel_url: "https://astera-farm.vercel.app/",
                  // success_url: "https://astera-farm.vercel.app/",
                  success_url: "https://asterafarmsph.com/",
                  livemode: true,
                  metadata: {
                    cart: JSON.stringify(metaDataItems),
                    userId: userId,
                    shippingAddress: JSON.stringify(location.state.shippingAddress)
                  }
                },
              },
            }),
          });           
          
          const checkoutSessionJSON = await checkoutSession.json();                  

          window.location.href = checkoutSessionJSON.data.attributes.checkout_url
          
        } catch (error) {
          console.error("Error creating payment intent:", error);
          // navigate('/')
        }
      }      
    }

    getUrl();
  }, [cartItems, customerEmail, description, location, userId, navigate]);
  return (
    <div>CheckoutPaymongo</div>
  )
}

export default CheckoutPayMongo