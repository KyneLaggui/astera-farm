import React, { useEffect, useState } from 'react'
import { supabase } from '@src/supabase/config';

const fetchProductUrl = async(id) => {
  if (id) {

    const { data, error } = await supabase
      .storage
      .from('products')
      .list('public/', {
        search: id, // Search for files containing the product id
      })
 
    if (data && !error) {
      const imageFile = data.find(file => file.name.startsWith(id) && /\.(png|jpg|jpeg|webp|gif)$/i.test(file.name))
  
      if (imageFile) {
        const { data } = supabase
          .storage
          .from('products')
          .getPublicUrl(`public/${imageFile.name}`)

        if (data) {
          return data.publicUrl
        }
      }
    } else {
      console.error('Error fetching product image:', error)
      return null
    }
  }
}

export default fetchProductUrl
