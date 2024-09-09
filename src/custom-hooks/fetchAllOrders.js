import React, { useEffect, useState } from 'react'

const fetchAllOrders = () => {
    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        const getAllOrders = async() => {
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: 'Basic c2tfdGVzdF84ZmRZaFhnOVhjM05kcHhmZVpxVmNKZng6'
                }
            };
              
            const response = await fetch('https://api.paymongo.com/v1/payments?limit=10', options)
            const result = await response.json()
    
            if (result.data) {                      
                // Function to extract valid cart metadata
                const extractValidCarts = (result) => {
                    return result.data
                    .filter((payment) => {
                        const metadata = payment.attributes.metadata;
                        if (metadata && metadata.cart) {
                        try {
                            JSON.parse(metadata.cart);
                            return true; // Keep the ones that can be parsed
                        } catch {
                            return false; // Filter out invalid ones
                        }
                        }
                        return false;
                    })
                    .map((payment) => JSON.parse(payment.attributes.metadata.cart)); // Convert valid cart strings to objects
                };
                
                const validCarts = extractValidCarts(result);
                console.log(validCarts);                    
            }
        }

        getAllOrders()
    }, [])


    return allOrders
}

export default fetchAllOrders