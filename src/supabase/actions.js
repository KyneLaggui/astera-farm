import { supabase } from "./config";
import { toast } from "react-toastify";

export const signUpWithEmailAndPassword = async (
    email,
    password,
    confirmPassword,
    username
  ) => {
    if (password !== confirmPassword) {
      return null
    }
    const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              username: username
            }
          }
        }
      )
    
    if (data) {
      return data;
    } else {
      return null;
    }
}

export const signInWithEmailAndPassword = async (email, password) => {
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return result.data.user
};

export const signOut = async () => {
  toast.success("Logged out successfully!");
  const logOut = await supabase.auth.signOut({ scope: 'local' });
  console.log(logOut)
};

export const editProfile = async (email, username) => {
  const { data, error } = await supabase
  .from('profile')
  .update({
    username: username,
  })
  .eq('email', email)
  
  console.log(data)
  if (error) {
    return null
  } else {
    return true
  }

};

// Cart actions
const calculateCartTotalAmount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + (cartItem.price * cartItem.cartQuantity);
  }, 0);
};

export const addToCart = async (cart, product, email) => {
  let cartItems = [...cart];
  const productIndex = cartItems.findIndex((item) => item.id === product.id);

  if (productIndex >= 0) {
    const updatedProduct = {
      ...cartItems[productIndex],
      cartQuantity: Math.min(cartItems[productIndex].cartQuantity + product.cartQuantity, 29), // Limit to 29
    };

    cartItems = [
      ...cartItems.slice(0, productIndex),
      updatedProduct,
      ...cartItems.slice(productIndex + 1),
    ];
  } else {
    const tempProduct = { ...product, cartQuantity: Math.min(product.cartQuantity, 29) };
    cartItems.push(tempProduct);
  }

  const { data, error } = await supabase
    .from('cart')
    .upsert({ email: email, cart: cartItems }, { onConflict: ['email'] })
    .select()
    .single();

  if (error) {
    console.error('Error updating cart:', error);
    return null;
  }

  return { totalAmount: calculateCartTotalAmount(cartItems), cartItems };
};


export const decreaseCart = async (cart, product, email) => {
  let cartItems = [...cart];
  const productIndex = cartItems.findIndex((item) => item.id === product.id);

  if (productIndex >= 0) {
    const currentQuantity = cartItems[productIndex].cartQuantity;
    
    if (currentQuantity > 1) {
      const updatedProduct = {
        ...cartItems[productIndex],
        cartQuantity: currentQuantity - 1,
      };

      cartItems = [
        ...cartItems.slice(0, productIndex),
        updatedProduct,
        ...cartItems.slice(productIndex + 1),
      ];
    } else {
      cartItems = cartItems.filter((item) => item.id !== product.id);
    }

    const result = await supabase
      .from('cart')
      .upsert({ email: email, cart: cartItems }, { onConflict: ['email'] })
      .select()
      .single();

    return {
      totalAmount: calculateCartTotalAmount(cartItems),
      cartItems,
    };
  }
};


    // REMOVE_FROM_CART(state, action) {
    //   state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    //   // Update total amount
    //   state.cartTotalAmount = calculateCartTotalAmount(state.cartItems);
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    // },

export const removeFromCart = async (cart, productId, email) => {
  // Make a shallow copy of the cart array to ensure immutability
  let cartItems = [...cart]; 

  // Find the index of the product in the cart
  cartItems = cartItems.filter((item) => item.id !== productId);

  const result = await supabase
  .from('cart')
  .upsert({
    email: email,  // The unique key to match
    cart: cartItems
  }, {
    onConflict: ['email'] // Specify the column(s) that are unique
  })
  .select()
  .single();

  // Update total amount    
  return {
    totalAmount: calculateCartTotalAmount(cartItems),
    cartItems: cartItems
  }
}

export const getProductStock = async (productId) => {
  try {
    const { data, error } = await supabase
      .from('product')
      .select('stock')
      .eq('id', productId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data ? data.stock : null;
  } catch (error) {
    console.error('Error fetching product stock:', error);
    return null;
  }
};