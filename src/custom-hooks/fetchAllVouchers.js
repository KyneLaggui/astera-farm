import { supabase } from '@src/supabase/config';
import React, { useEffect, useState } from 'react';

const fetchAllVouchers = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      const { data, error } = await supabase.from('voucher').select('*');

      if (data) {      
        const allVouchers = data.map((voucher) => {
            return {
            ...voucher,
            }
      })

        setVouchers(allVouchers);
      } else {
        console.log(error);
      }
    };

    fetchVouchers();
  }, []);

  return { vouchers };
};

export default fetchAllVouchers;
