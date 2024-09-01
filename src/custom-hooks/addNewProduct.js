import { supabase } from '@src/supabase/config'
import React, { useEffect } from 'react'

const addNewProduct = ({ newProduct, attributes }) => {
    useEffect(() => {
        const addProduct = async() => {
            if (newProduct && attributes) {
                const insertResult = await supabase
                    .from('products')
                    .insert({
                        name: newProduct.name,
                        description: newProduct.description,
                        price: newProduct.price,
                        sell_method: newProduct.sellMethod,
                        attributes: attributes
                    })
                    .single()

                if (insertResult.error) {
                    console.error('Error inserting new product:', insertResult.error.message)
                }
            }
        }

        addProduct()     
    }, [newProduct, attributes])

}

export default addNewProduct