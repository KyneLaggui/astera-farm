import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/config';
import { useNavigate } from 'react-router-dom';
import { selectUserID } from '../../redux/slice/authSlice';
import { useSelector } from 'react-redux';
import FetchUserProfile from '../../customHooks/fetchUserProfile';
import Loader from '../../components/loader/Loader';

// For faculty/faculty admin role pages only
const LoggedInOnly = ({ children }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const getSession = async() => {            
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              navigate("/")
            } else {
                setIsLoading(false)
            }
        }

        getSession()
        
    }, [id, navigate, userData])
       
  return (
    <div>
      {/* {isLoading || isLoadingProfile ? <Loader /> : children} */}
      {children}
    </div>
  )
}

export default LoggedInOnly