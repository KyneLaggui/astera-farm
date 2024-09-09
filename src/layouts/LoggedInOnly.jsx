import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/config';
import { useNavigate } from 'react-router-dom';

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
        
    }, [navigate, userData])
       
  return (
    <div>
      {/* {isLoading || isLoadingProfile ? <Loader /> : children} */}
      {children}
    </div>
  )
}

export default LoggedInOnly