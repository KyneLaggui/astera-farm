import React, { useEffect, useState } from 'react';
import { selectIsAdmin, selectIsLoggedIn } from '@src/redux/slice/authSlice';
import { useSelector } from 'react-redux';

const LoggedInOnlyComponent = ({ children, forAdmin, forUser }) => {
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

  if (!isLoggedIn) {
    return <></>;
  }

  if (!forAdmin && isAdmin) {
    return <></>
  }

  if (!forUser && !isAdmin) {
    return <></>
  }

  return <>{children}</>;
};

export default LoggedInOnlyComponent;
