import React, { useEffect, useState } from 'react';
import { selectIsAdmin, selectIsLoggedIn } from '@src/redux/slice/authSlice';
import { useSelector } from 'react-redux';

const UserGuestOnlyComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const isLoggedInRedux = useSelector(selectIsLoggedIn);
  const isAdminRedux = useSelector(selectIsAdmin);  

  useEffect(() => {
    const getSession = async () => {
      if (isLoggedInRedux) {        
        setIsLoggedIn(true);

        if (isAdminRedux) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);

      }
      
      setIsLoading(false);
    };

    getSession();
  }, [isAdminRedux, isLoggedInRedux]);

  if (isAdmin) {
    return <></>
  }

  return <>{children}</>;
};

export default UserGuestOnlyComponent;
