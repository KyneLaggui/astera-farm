import { supabase } from '@src/supabase/config';
import React, { useEffect, useState } from 'react';

const fetchAllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('product').select('*');

      if (data) {
        const productStocks = await Promise.all(
          data.map(async (product) => {
            const { data: stockData, error: stockError } = await supabase
              .from('stock')
              .select('quantity')
              .eq('product_id', product.id)
              .single();

            if (stockError) {
              console.log(stockError);
            }

            return {
              ...product,
              stock: stockData ? stockData.quantity : 0,
            };
          })
        );

        setProducts(productStocks);
      } else {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return { products };
};

export default fetchAllProduct;
