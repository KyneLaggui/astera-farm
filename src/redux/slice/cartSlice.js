import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '@src/supabase/config'

const calculateCartTotalAmount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + (cartItem.price * cartItem.cartQuantity);
  }, 0);
};

const calculateCartTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.cartQuantity;
  }, 0);
};

const initialState = {
  cartItems:[],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    SET_EMAIL(state, action) {
      state.email = action.payload;    
    },
    SET_CART(state, action) {
      state.cartItems = action.payload;
      state.cartTotalAmount = calculateCartTotalAmount(action.payload);
      state.cartTotalQuantity = calculateCartTotalQuantity(action.payload);
    },
  }
});

export const { SET_CART, ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, 
  CLEAR_CART, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;

