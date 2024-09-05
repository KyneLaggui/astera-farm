import { supabase } from '@src/supabase/config';

const fetchProductIconPath = async (id) => {
  if (id) {
    const { data, error } = await supabase
      .storage
      .from('products')
      .list('public/', {
        search: id, // Search for files containing the product id
      });

    if (data && !error) {
      const imageFile = data.find(file => file.name.startsWith(id) && /\.(png|jpg|jpeg|webp|gif)$/i.test(file.name));

      if (imageFile) {
        // Return the folder and file name as a path string
        return `public/${imageFile.name}`;
      }
    } else {
      console.error('Error fetching product image:', error);
      return null;
    }
  }
};

export default fetchProductIconPath;
