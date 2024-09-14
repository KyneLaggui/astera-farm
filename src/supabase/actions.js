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
  await supabase.auth.signOut();
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

  // Find the product index in the current cart
  const productIndex = cartItems.findIndex((item) => item.id === product.id);

  if (productIndex >= 0) {
    // Update product quantity in the cart
    const updatedProduct = {
      ...cartItems[productIndex],
      cartQuantity: cartItems[productIndex].cartQuantity + product.cartQuantity,
    };

    cartItems = [
      ...cartItems.slice(0, productIndex),
      updatedProduct,
      ...cartItems.slice(productIndex + 1),
    ];
  } else {
    // Add new product to cart
    const tempProduct = { ...product, cartQuantity: product.cartQuantity };
    cartItems.push(tempProduct);
  }

  // Upsert the updated cart to Supabase
  const { data, error } = await supabase
    .from('cart')
    .upsert(
      { email: email, cart: cartItems },
      { onConflict: ['email'] }
    )
    .select()
    .single();

  if (error) {
    console.error('Error updating cart:', error);
    return null; // Handle error as needed
  }

  // Return the updated cartItems
  return {
    totalAmount: calculateCartTotalAmount(cartItems),
    cartItems,
  };
};

export const decreaseCart = async(cart, product, email) => {
  // Make a shallow copy of the cart array to ensure immutability
  let cartItems = [...cart]; 

  // Find the index of the product in the cart
  const productIndex = cartItems.findIndex((item) => item.id === product.id);

  if (cartItems[productIndex].cartQuantity > 1) {
  // Create a new product object with updated cartQuantity
  const updatedProduct = {
    ...cartItems[productIndex],
    cartQuantity: cartItems[productIndex].cartQuantity - 1
  };

  // Create a new cart array with the updated product
  cartItems = [
    ...cartItems.slice(0, productIndex),
    updatedProduct,
    ...cartItems.slice(productIndex + 1)
  ];

  } else if (cartItems[productIndex].cartQuantity === 1) {
      cartItems = cartItems.filter((item) => item.id !== action.payload.id);
  }
      // Now, upsert the cart to Supabase

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