import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '@src/redux/slice/authSlice';
import { supabase } from '@src/supabase/config';

const fetchUserShippingAddress = () => {
    const [shippingAddress, setShippingAddress] = useState([])
    const email = useSelector(selectEmail)

    useEffect(() => {
        if (email) {
            const fetchUserShippingAddress = async () => {
                const { data, error } = await supabase
                    .from('shipping_address')
                    .select('*')
                    .eq('email', email)
                if (error) {
                    console.error('Error fetching user shipping address:', error)
                } else {
                    setShippingAddress(data)
                }
            }
            fetchUserShippingAddress()  
        }
    }, [email])

  return shippingAddress
}

export default fetchUserShippingAddress