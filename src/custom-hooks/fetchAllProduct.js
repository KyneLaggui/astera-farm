import { supabase } from '@src/supabase/config';
import React, { useEffect, useState } from 'react'

const fetchAllProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('product')
                .select('*')

            if (data) {
                setProducts(data)
            } else {
                console.log('okayy')
                console.log(error)
            }
        }
        fetchProducts()
    }, [])

    return { products: products }
}

export default fetchAllProduct