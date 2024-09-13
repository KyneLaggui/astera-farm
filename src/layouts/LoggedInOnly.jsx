import React, { useEffect, useState } from 'react';
import { selectIsAdmin, selectIsLoggedIn } from '@src/redux/slice/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoggedInOnlyComponent = ({ children, forAdmin, forUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const isLoggedInRedux = useSelector(selectIsLoggedIn);
  const isAdminRedux = useSelector(selectIsAdmin);  

  useEffect(() => {
    const handleNavigation = () => {
      // Wait until loading finishes before navigating
      if (!isLoading && isAdminRedux !== null && isLoggedInRedux !== null) {
        console.log(isLoggedInRedux, isAdminRedux);
        if (!isLoggedInRedux) {
          navigate('/');
          return;
        }
  
        if (forAdmin && !isAdminRedux) {
          navigate('/');
          return;
        }
  
        if (forUser && isAdminRedux) {
          navigate('/admin/dashboard');
          return;
        }
      }
    };

    setIsLoading(false);
    handleNavigation();
  }, [isAdminRedux, isLoggedInRedux, isLoading, navigate, forAdmin, forUser]);

  // Show a loading state until the Redux state is initialized
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default LoggedInOnlyComponent;
