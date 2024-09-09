import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '@src/redux/slice/authSlice';  // Update the path as needed
import { supabase } from '@src/supabase/config';

const FetchUserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const email = useSelector(selectEmail);  // Get the user's email from Redux

  useEffect(() => {
    if (!email) return;  // Exit if email is not available

    const getProfile = async () => {
      setIsLoadingProfile(true);

      try {
        const { data } = await supabase
          .from('profile')
          .select('*')
          .eq('email', email)
          .single();  // Fetch user profile by email

        if (data) {
          setUser(data);  // Set the fetched profile
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    getProfile();
  }, [email]);

  return { userData: user, isLoadingProfile };
};

export default FetchUserProfile;
