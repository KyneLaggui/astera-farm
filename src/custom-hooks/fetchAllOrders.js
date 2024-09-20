import React, { useEffect, useState } from 'react';
import { SET_ORDERS } from '@src/redux/slice/ordersSlice';
import { useDispatch } from 'react-redux';
import { supabase } from '@src/supabase/config';
import { UPDATE_PRODUCT } from '@src/redux/slice/productsSlice';

const fetchAllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllOrders = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Basic c2tfdGVzdF9iNTR6bVYxSFRjSlVXYkcxemZQeUo1Umk6',
        },
      };

      const response = await fetch('https://api.paymongo.com/v1/payments?limit=100', options);
      const result = await response.json();
      if (result.data) {
        const extractValidCarts = (result) => {
          return result.data
            .filter((payment) => {
              const metadata = payment.attributes.metadata;
              if (metadata && metadata.cart && metadata.shippingAddress) {
                try {
                  const cart = JSON.parse(metadata.cart);
                  const shippingAddress = JSON.parse(metadata.shippingAddress);

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
                createdAt: payment.attributes.created_at,
              };
            });
        };

        const validCarts = extractValidCarts(result);

        const mergedOrders = [];

        for (const order of validCarts) {
          const { data: existingOrder, error } = await supabase
            .from('order')
            .select('*')
            .eq('order_id', order.id)
            .single();

          const orderType = order.cart.some((product) => product.quantity >= 30) ? 'Bulk' : 'Retail';
          let mergedOrder = {
            ...order,
            status: "Order Placed",
            type: orderType,
          };

          if (existingOrder) {
            // If order exists, update its status and type if missing
            mergedOrder = { 
              ...order, 
              status: existingOrder.status, 
              lastUpdated: existingOrder.last_updated,
              type: existingOrder.type || orderType, 
            };

            if (!existingOrder.type) {
              // Update order type if it's NULL
              const { error: updateError } = await supabase
                .from('order')
                .update({ type: orderType })
                .eq('order_id', order.id);

              if (updateError) {
                console.error('Error updating order type:', updateError);
              } else {
                console.log('Order type updated successfully:', order.id);
              }
            }

            if (!existingOrder.stock_reduced) {
              // Update the `stock_reduced` flag first to prevent duplicate reduction
              const { error: updateOrderError } = await supabase
                .from('order')
                .update({ stock_reduced: true })
                .eq('order_id', order.id);
            
              if (updateOrderError) {
                console.error('Error updating stock_reduced flag:', updateOrderError);
              } else {
                console.log('Stock reduction flag set to true for order:', order.id);
            
                // Now proceed to reduce stock for each product in the order
                for (const product of order.cart) {
                  const { data: productData, error: productError } = await supabase
                    .from('product')
                    .select('stock')
                    .eq('name', product.name) // Assuming 'name' is the identifier
                    .single();
            
                  if (productError) {
                    console.error(`Error fetching product stock for product_id: ${product.name}`, productError);
                  } else {
                    const newStock = productData.stock - product.quantity;
            
                    const { error: updateStockError, data: updatedProductRow } = await supabase
                      .from('product')
                      .update({ stock: newStock })
                      .eq('name', product.name)    
                      .select() // This ensures the updated row is returned
                      .single();     
            
                    if (updateStockError) {
                      console.error(`Error updating stock for product name: ${product.name}`, updateStockError);
                    } else {
                      console.log(updatedProductRow);
                       dispatch(UPDATE_PRODUCT({
                        id: updatedProductRow.id,
                        stock: isNaN(newStock) ? 0 : Number(newStock),
                      }))
                      mergedOrder.updatedProducts = mergedOrder.updatedProducts || [];
                      mergedOrder.updatedProducts.push(updatedProductRow);
                    }
                  }
                }
              }
            }
            
          } else {
            // Insert new order into Supabase with type
            const { error: insertError } = await supabase
              .from('order')
              .insert([
                {
                  order_id: order.id,
                  status: "Order Placed",
                  type: orderType, // Ensure the type is inserted for new orders
                  stock_reduced: false, // New orders will initially have stock_reduced as false
                },
              ]);

            if (insertError) {
              console.error('Error inserting order:', insertError);
            } else {
              console.log('Order inserted successfully with type:', order.id);
            }
          }

          mergedOrders.push(mergedOrder);
        }

        // Set valid carts to state
        setAllOrders(mergedOrders);
        dispatch(SET_ORDERS(mergedOrders)); // Dispatch to Redux
      }
    };

    getAllOrders();
  }, [dispatch]);

  return { orders: allOrders };
};

export default fetchAllOrders;
