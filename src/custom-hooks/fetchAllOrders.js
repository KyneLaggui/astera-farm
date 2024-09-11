import React, { useEffect, useState } from 'react';
import { SET_ORDERS } from '@src/redux/slice/ordersSlice';
import { useDispatch } from 'react-redux';
import { supabase } from '@src/supabase/config';

const fetchAllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllOrders = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Basic c2tfdGVzdF84ZmRZaFhnOVhjM05kcHhmZVpxVmNKZng6',
        },
      };

      const response = await fetch('https://api.paymongo.com/v1/payments?limit=100', options);
      const result = await response.json();

      if (result.data) {
        // Function to extract valid cart metadata and filter out invalid ones
        const extractValidCarts = (result) => {
          return result.data
            .filter((payment) => {
              const metadata = payment.attributes.metadata;
              if (metadata && metadata.cart && metadata.shippingAddress) {
                try {
                  const cart = JSON.parse(metadata.cart);
                  const shippingAddress = JSON.parse(metadata.shippingAddress);

                  // Filter out invalid shipping addresses (null or empty objects)
                  if (shippingAddress && Object.keys(shippingAddress).length > 0) {
                    return true; // Keep valid carts
                  }
                  return false; // Filter out invalid shipping addresses
                } catch {
                  return false; // Filter out invalid JSON
                }
              }
              return false; // Filter out if cart or shippingAddress is missing
            })
            .map((payment) => {
              const metadata = payment.attributes.metadata;
              return {
                id: payment.id,
                cart: JSON.parse(metadata.cart),
                userId: metadata.userId,
                total: payment.attributes.amount,
                paymentMethod: payment.attributes.source.type,
                shippingAddress: JSON.parse(metadata.shippingAddress),
              };
            });
        };

        const validCarts = extractValidCarts(result);

        const mergedOrders = [];

        // Insert valid carts into the database and accumulate merged orders
        for (const order of validCarts) {
          const { data: existingOrder, error } = await supabase
            .from('order')
            .select('*') // Select all fields to check for existing order
            .eq('order_id', order.id)
            .single();

          let mergedOrder = {
            ...order,
            status: "Order Placed", // Default status if inserting new order
          };

          if (existingOrder) {
            // Merge status from the existing order
            mergedOrder = { ...order, status: existingOrder.status, lastUpdated: existingOrder.last_updated };
          } else {
            // Insert the order into Supabase
            const { error: insertError } = await supabase
              .from('order')
              .insert([
                {
                  order_id: order.id,
                  status: "Order Placed", // Set status as pending for new orders
                },
              ]);

            if (insertError) {
              console.error('Error inserting order:', insertError);
            } else {
              console.log('Order inserted successfully:', order.id);
            }
          }

          // Add merged order (with status) to the list
          mergedOrders.push(mergedOrder);
        }

        // Dispatch merged orders to Redux
        console.log('Merged orders:', mergedOrders);
        setAllOrders(mergedOrders); // Set the valid carts to state
        dispatch(SET_ORDERS(mergedOrders));
      }
    };

    getAllOrders();
  }, [dispatch]);

  return { orders: allOrders };
};

export default fetchAllOrders;
