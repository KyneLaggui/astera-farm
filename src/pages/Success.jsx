import { supabase } from '@src/supabase/config'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
    const isMounted = useRef(false) // Ref to track if the component is mounted

    useEffect(() => {
        if (!isMounted.current) {
            const insertOrder = async () => {
                const result = await supabase
                    .from('order')
                    .insert({
                        status: "pending",
                        user_id: "d4dcc322-d6c4-423e-9874-6076d2bf5d6b",
                        total: 4000,
                        cart: [
                            {
                                currency: 'PHP',
                                amount: 149,
                                name: 'LALIQUE LETTUCE',
                                quantity: 12
                            },
                            {
                                currency: 'PHP',
                                amount: 299,
                                name: 'OLMETIE LETTUCE',
                                quantity: 12
                            },
                            {
                                currency: 'PHP',
                                amount: 149,
                                name: 'LALIQUE LETTUCE',
                                quantity: 12
                            },
                        ],
                        payment_method: "gcash",
                    })

                if (result.error) {
                    console.log(result.error)
                } else {
                    navigate('/')
                }
            }

            insertOrder()
            isMounted.current = true // Mark as mounted after the first run
        }
    }, [])

    return <div>Success</div>
}

export default Success
