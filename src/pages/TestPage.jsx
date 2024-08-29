import React from 'react'
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from "@src/supabase/actions"
import FetchUserProfile from '@src/custom_hooks/fetchUserProfile'
import { supabase } from '@src/supabase/config'
import { useDispatch } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '@src/redux/slice/authSlice'

const TestPage = () => {
  const dispatch = useDispatch()

  // const submitProduct = async() => {
  //   const logoResult = await supabase.storage
  //   .from("companyLogo")
  //   .upload(`public/${user.id}.${logoFileExt}`, currentUserData.logo, {
  //     cacheControl: "3600",
  //     upsert: true,
  //   });
  // }

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
        dispatch(
            SET_ACTIVE_USER({
                email: session.user.email,
                userId: session.user.id,                 
            })
        );
                                     
    } else {
        dispatch(REMOVE_ACTIVE_USER());
    }
  })

  FetchUserProfile()

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

    const handleLogin = async () => {
      signInWithEmailAndPassword('josephbuhain27@Gmail.com', 'hellowws')
    }

  return (
    <div>
      <div onClick={handleRegister}>TestPage</div>
      <div onClick={handleLogin}>Login</div>
    </div>   
  )
}

export default TestPage