import { supabase } from '@src/supabase/config';
import React, { useEffect, useState } from 'react';

const fetchAllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('product').select('*');

      if (data) {      

      const allProducts = data.map((product) => {
        return {
          ...product,
          stock: product.stock ? product.stock : 0,
        }
      })

        setProducts(allProducts);
      } else {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return { products };
};

export default fetchAllProduct;
