import { supabase } from '@src/supabase/config';
import { useEffect, useState } from 'react';

const useFetchAllTestimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonies = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('testimonial').select('*');

      if (error) {
        setError(error.message);
      } else {
        setTestimonies(data || []);
      }
      setLoading(false);
    };

    fetchTestimonies();
  }, []);

  // Return setTestimonies for external updates
  return { testimonies, setTestimonies, loading, error };
};

export default useFetchAllTestimonies;

