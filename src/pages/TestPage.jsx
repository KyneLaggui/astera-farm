import React from 'react'
import { signUpWithEmailAndPassword } from "@src/supabase/actions"

const TestPage = () => {

    const handleRegister = async () => {
        signUpWithEmailAndPassword('josephbuhain27@Gmail.com',
        'hellowws',
        'hellowws',
        'joseph',
        'supelario',
        'buhain',
        '03293929392932',
        )
    }   

  return (
    <div onClick={handleRegister}>TestPage</div>
  )
}

export default TestPage